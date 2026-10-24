const { calcularIVA } = require('./iva');
const { calcularDescuentoVolumen } = require('./descuentoVolumen');

describe('Integración: cálculo de compra del taller', () => {
  test('calcula subtotal, descuento, IVA y total exactos sin envío', () => {
    // Arrange
    const productos = [
      { nombre: 'Licuadora', precio: 180000, cantidad: 1, tarifaIVA: 19 },
      { nombre: 'Café', precio: 15000, cantidad: 2, tarifaIVA: 5 },
      { nombre: 'Arroz', precio: 4500, cantidad: 4, tarifaIVA: 0 },
    ];
    const subtotal = productos.reduce(
      (suma, producto) => suma + producto.precio * producto.cantidad,
      0
    );

    // Act
    const resultadoDescuento = calcularDescuentoVolumen(subtotal);
    const ivaTotal = productos.reduce(
      (suma, producto) =>
        suma +
        calcularIVA(
          producto.precio * producto.cantidad,
          producto.tarifaIVA,
          resultadoDescuento.tarifa
        ),
      0
    );
    const total = resultadoDescuento.totalConDescuento + ivaTotal;

    // Assert
    expect(subtotal).toBe(228000);
    expect(resultadoDescuento.tarifa).toBe(5);
    expect(resultadoDescuento.descuento).toBe(11400);
    expect(ivaTotal).toBe(33915);
    expect(total).toBe(250515);
  });
});
