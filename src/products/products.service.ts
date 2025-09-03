import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  // Crear con SKU único
  async create(dto: CreateProductDto) {
    const exists = await this.repo.exist({ where: { sku: dto.sku } });
    if (exists) {
      throw new ConflictException('El SKU ya existe. Debe ser único.');
    }
    const product = this.repo.create({
      ...dto,
      precio: dto.precio.toString(),
      stock: dto.stock ?? 0,
    });
    return this.repo.save(product);
  }

  async findOne(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  // Actualizar (stock >= 0) y SKU no duplicado con otro id
  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (dto.stock !== undefined && dto.stock < 0) {
      throw new BadRequestException('El stock no puede ser negativo.');
    }

    if (dto.sku) {
      const other = await this.repo.findOne({ where: { sku: dto.sku } });
      if (other && other.id !== id) {
        throw new ConflictException('El SKU ya está en uso por otro producto.');
      }
    }

    const merged = this.repo.merge(product, {
      ...dto,
      precio: dto.precio !== undefined ? dto.precio.toString() : product.precio,
    });
    return this.repo.save(merged);
  }

  // Eliminar solo si stock == 0
  async remove(id: number) {
    const product = await this.findOne(id);
    if (product.stock > 0) {
      throw new ConflictException('No se puede eliminar un producto con stock mayor a cero.');
    }
    await this.repo.delete(id);
    return { message: 'Producto eliminado' };
  }

  // Búsqueda avanzada + paginación + orden
  async search(dto: SearchProductsDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;
    const sortBy = (dto.sortBy ?? 'id') as keyof Product;
    const order = (dto.order ?? 'ASC').toString().toUpperCase() as 'ASC' | 'DESC';

    const qb = this.repo.createQueryBuilder('p');

    if (dto.filters) {
      const { id, sku, nombre, descripcion } = dto.filters;
      if (id) qb.andWhere('p.id = :id', { id });
      if (sku) qb.andWhere('p.sku = :sku', { sku });
      if (nombre) qb.andWhere('p.nombre ILIKE :nombre', { nombre: `%${nombre}%` });
      if (descripcion) qb.andWhere('p.descripcion ILIKE :descripcion', { descripcion: `%${descripcion}%` });
    }

    qb.orderBy(`p.${String(sortBy)}`, order)
      .skip((page - 1) * limit)
      .take(limit);

    const [data, totalItems] = await qb.getManyAndCount();
    const totalPages = Math.ceil(totalItems / limit) || 1;

    return { data, currentPage: page, totalPages, totalItems };
  }
}

