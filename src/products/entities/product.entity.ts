import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'productos' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: string; // TypeORM devuelve string para DECIMAL

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50, unique: true })
  sku: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
