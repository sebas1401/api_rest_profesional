# API REST Profesional con NestJS - Gestión de Productos

Este proyecto corresponde a la Tarea 7 y tiene como objetivo el desarrollo de un backend robusto con NestJS para la gestión de productos. La aplicación está pensada para demostrar buenas prácticas de arquitectura de software, validación de datos y aplicación de reglas de negocio reales.

## Descripción de la aplicación
La API expone operaciones completas para administrar productos dentro de un sistema. Está organizada en una arquitectura por capas que facilita la separación de responsabilidades: el controlador atiende las solicitudes HTTP, el servicio contiene la lógica de negocio, las entidades representan la información en la base de datos y los DTOs aseguran que los datos recibidos sean válidos.

Cada producto cuenta con los siguientes campos:  
- `id`: identificador único  
- `nombre`: nombre del producto  
- `descripcion`: detalle o información adicional  
- `precio`: valor numérico  
- `stock`: cantidad disponible en inventario  
- `sku`: código único de producto  

## Funcionalidades principales
- **CRUD de productos**: creación, consulta, actualización y eliminación de productos.  
- **Validaciones de datos**: se asegura que los campos cumplan con formatos correctos (ejemplo: precios numéricos, nombres obligatorios, stock mayor o igual a cero).  
- **Reglas de negocio**:  
  - El campo `sku` debe ser único.  
  - No se permite actualizar un producto con stock negativo.  
  - No se permite eliminar un producto si aún tiene stock disponible.  
- **Búsqueda avanzada**: un endpoint especializado que permite realizar consultas con filtros, ordenamiento y paginación, devolviendo resultados estructurados y fáciles de interpretar.  

## Respuesta de búsqueda avanzada
El endpoint de búsqueda devuelve tanto los resultados como la información de paginación, de la siguiente manera:  
- `data`: lista de productos encontrados  
- `currentPage`: número de la página actual  
- `totalPages`: cantidad total de páginas disponibles  
- `totalItems`: total de registros encontrados  

## Objetivo
Este backend está diseñado para ser consumido por cualquier aplicación frontend, mostrando cómo aplicar conceptos de arquitectura limpia, validación de datos y manejo de reglas de negocio en un entorno profesional.
