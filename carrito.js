class Carrito {
  constructor(servicioInventario) {
    this.servicioInventario = servicioInventario;
    this.productos = new Map();
  }

  agregarProducto(producto, cantidad) {
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 50) {
      throw new Error('La cantidad debe estar entre 1 y 50');
    }

    if (!producto || producto.id === undefined || producto.id === null) {
      throw new Error('El producto debe tener un id');
    }

    if (
      !this.servicioInventario ||
      typeof this.servicioInventario.obtenerStock !== 'function'
    ) {
      throw new Error('Se requiere un servicio de inventario válido');
    }

    const cantidadEnCarrito = this.obtenerCantidad(producto.id);
    const stock = this.servicioInventario.obtenerStock(producto.id);

    if (!Number.isFinite(stock) || stock < 0) {
      throw new Error('El servicio de inventario devolvió un stock inválido');
    }

    if (cantidadEnCarrito + cantidad > stock) {
      throw new Error('Stock insuficiente');
    }

    this.productos.set(producto.id, {
      producto,
      cantidad: cantidadEnCarrito + cantidad,
    });
  }

  obtenerCantidad(idProducto) {
    return this.productos.get(idProducto)?.cantidad ?? 0;
  }
}

module.exports = Carrito;
