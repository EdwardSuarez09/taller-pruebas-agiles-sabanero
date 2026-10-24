const { calcularDescuentoVolumen } = require('./descuentoVolumen');

describe('HU-03: Calcular descuento por volumen', () => {
  test.each([
    [0, 0],
    [0, 199999],
    [5, 200000],
    [5, 499999],
    [10, 500000],
  ])('aplica el descuento de %i%% al subtotal de %i', (tarifa, subtotal) => {
    // Arrange
    const compra = subtotal;

    // Act
    const resultado = calcularDescuentoVolumen(compra);

    // Assert
    expect(resultado.tarifa).toBe(tarifa);
    expect(resultado.descuento).toBe((subtotal * tarifa) / 100);
    expect(resultado.totalConDescuento).toBe(
      subtotal - (subtotal * tarifa) / 100
    );
  });

  test('rechaza un subtotal negativo', () => {
    // Arrange
    const subtotalInvalido = -1;

    // Act
    const accion = () => calcularDescuentoVolumen(subtotalInvalido);

    // Assert
    expect(accion).toThrow('El subtotal debe ser un número mayor o igual a 0');
  });

  test('rechaza un subtotal que no sea un número finito', () => {
    // Arrange
    const subtotalInvalido = Number.POSITIVE_INFINITY;

    // Act
    const accion = () => calcularDescuentoVolumen(subtotalInvalido);

    // Assert
    expect(accion).toThrow('El subtotal debe ser un número mayor o igual a 0');
  });
});
