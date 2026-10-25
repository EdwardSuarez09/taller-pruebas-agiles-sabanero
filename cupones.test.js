const { aplicarCupon } = require('./cupones');
const { calcularDescuentoVolumen } = require('./descuentoVolumen');

describe('HU-04: Usar cupones', () => {
  test.each([
    [50000, 5000],
    [100000, 10000],
  ])(
    'SABANERO10 da 10%% de descuento sobre el subtotal de %i',
    (subtotal, descuentoEsperado) => {
      // Arrange
      const volumen = calcularDescuentoVolumen(subtotal);

      // Act
      const resultado = aplicarCupon('SABANERO10', subtotal, volumen);

      // Assert
      expect(resultado.descuento).toBe(descuentoEsperado);
      expect(resultado.totalConDescuento).toBe(subtotal - descuentoEsperado);
    }
  );

  test('rechaza SABANERO10 si el subtotal es menor a 50000', () => {
    // Arrange
    const subtotal = 49999;
    const volumen = calcularDescuentoVolumen(subtotal);

    // Act
    const accion = () => aplicarCupon('SABANERO10', subtotal, volumen);

    // Assert
    expect(accion).toThrow('requiere un subtotal mínimo');
  });

  test.each([
    [200000, 20000],
    [500000, 50000],
  ])(
    'con subtotal de %i aplica solo el descuento mayor y no suma volumen con SABANERO10',
    (subtotal, descuentoEsperado) => {
      // Arrange
      const volumen = calcularDescuentoVolumen(subtotal);

      // Act
      const resultado = aplicarCupon('SABANERO10', subtotal, volumen);

      // Assert
      expect(resultado.descuento).toBe(descuentoEsperado);
    }
  );
});