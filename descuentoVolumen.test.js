const { calcularDescuentoVolumen } = require('./descuentoVolumen');

describe('HU-03: Calcular descuento por volumen', () => {
  test.each([
    [0, 0, 0, 0],
    [0, 199999, 0, 199999],
    [5, 200000, 10000, 190000],
    [5, 200010, 10001, 190009],
    [5, 499999, 25000, 474999],
    [10, 500000, 50000, 450000],
    [10, 500005, 50001, 450004],
  ])(
    'aplica %i%% y calcula importes enteros para subtotal %i',
    (tarifa, subtotal, descuentoEsperado, totalEsperado) => {
      // Arrange
      const compra = subtotal;

      // Act
      const resultado = calcularDescuentoVolumen(compra);

      // Assert
      expect(resultado.tarifa).toBe(tarifa);
      expect(resultado.descuento).toBe(descuentoEsperado);
      expect(resultado.totalConDescuento).toBe(totalEsperado);
    }
  );

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
