const Carrito = require('./carrito');

const crearCarrito = (stock = 100) => {
  const mockInventario = { obtenerStock: jest.fn().mockReturnValue(stock) };
  return { carrito: new Carrito(mockInventario), mockInventario };
};

describe('HU-01: Agregar productos al carrito', () => {
  test.each([1, 50])(
    'agrega una cantidad permitida de %i unidades',
    (cantidad) => {
      // Arrange
      const { carrito } = crearCarrito();
      const producto = { id: 1, nombre: 'Licuadora', precio: 180000 };

      // Act
      carrito.agregarProducto(producto, cantidad);

      // Assert
      expect(carrito.obtenerCantidad(1)).toBe(cantidad);
    }
  );

  test.each([0, 51, -1])(
    'rechaza la cantidad no permitida de %i unidades',
    (cantidad) => {
      // Arrange
      const { carrito } = crearCarrito();
      const producto = { id: 1, nombre: 'Licuadora', precio: 180000 };

      // Act
      const accion = () => carrito.agregarProducto(producto, cantidad);

      // Assert
      expect(accion).toThrow('La cantidad debe estar entre 1 y 50');
    }
  );

  test('consulta el stock externo antes de agregar el producto', () => {
    // Arrange
    const { carrito, mockInventario } = crearCarrito(10);
    const producto = { id: 1, nombre: 'Café', precio: 15000 };

    // Act
    carrito.agregarProducto(producto, 2);

    // Assert
    expect(mockInventario.obtenerStock).toHaveBeenCalledWith(1);
    expect(carrito.obtenerCantidad(1)).toBe(2);
  });

  test('lanza un error si el stock externo es insuficiente', () => {
    // Arrange
    const { carrito, mockInventario } = crearCarrito(1);
    const producto = { id: 2, nombre: 'Arroz', precio: 4500 };

    // Act
    const accion = () => carrito.agregarProducto(producto, 2);

    // Assert
    expect(accion).toThrow('Stock insuficiente');
    expect(mockInventario.obtenerStock).toHaveBeenCalledWith(2);
    expect(carrito.obtenerCantidad(2)).toBe(0);
  });

  test('suma la cantidad cuando el producto ya está en el carrito', () => {
    // Arrange
    const { carrito, mockInventario } = crearCarrito(10);
    const producto = { id: 3, nombre: 'Café', precio: 15000 };

    // Act
    carrito.agregarProducto(producto, 2);
    carrito.agregarProducto(producto, 3);

    // Assert
    expect(carrito.obtenerCantidad(3)).toBe(5);
    expect(mockInventario.obtenerStock).toHaveBeenCalledTimes(2);
  });

  test('requiere un servicio de inventario válido', () => {
    // Arrange
    const producto = { id: 1, nombre: 'Licuadora', precio: 180000 };

    // Act
    const accion = () => new Carrito().agregarProducto(producto, 1);

    // Assert
    expect(accion).toThrow('Se requiere un servicio de inventario válido');
  });

  test('rechaza un producto sin identificador y no consulta el inventario', () => {
    // Arrange
    const { carrito, mockInventario } = crearCarrito();
    const producto = { nombre: 'Producto sin id', precio: 1000 };

    // Act
    const accion = () => carrito.agregarProducto(producto, 1);

    // Assert
    expect(accion).toThrow('El producto debe tener un id');
    expect(mockInventario.obtenerStock).not.toHaveBeenCalled();
  });

  test.each([Number.NaN, -1])(
    'rechaza un stock inválido de %s sin modificar el carrito',
    (stock) => {
      // Arrange
      const { carrito } = crearCarrito(stock);
      const producto = { id: 4, nombre: 'Arroz', precio: 4500 };

      // Act
      const accion = () => carrito.agregarProducto(producto, 1);

      // Assert
      expect(accion).toThrow(
        'El servicio de inventario devolvió un stock inválido'
      );
      expect(carrito.obtenerCantidad(4)).toBe(0);
    }
  );
});
