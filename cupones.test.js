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
  test('ENVIOGRATIS deja el envío gratis y conserva el descuento por volumen', () => {
    // Arrange
    const subtotal = 200000;
    const volumen = calcularDescuentoVolumen(subtotal);

    // Act
    const resultado = aplicarCupon('ENVIOGRATIS', subtotal, volumen);

    // Assert
    expect(resultado.envioGratis).toBe(true);
    expect(resultado.descuento).toBe(10000);
  });

  test('rechaza un cupón inexistente con error de cupón inválido', () => {
    // Arrange
    const subtotal = 100000;
    const volumen = calcularDescuentoVolumen(subtotal);

    // Act
    const accion = () => aplicarCupon('NOEXISTE', subtotal, volumen);

    // Assert
    expect(accion).toThrow('Cupón inválido');
  });

  test('rechaza un cupón vencido con error de cupón inválido', () => {
    // Arrange
    const subtotal = 100000;
    const volumen = calcularDescuentoVolumen(subtotal);
    const catalogo = {
      VIEJO10: { tipo: 'porcentaje', valor: 10, subtotalMinimo: 0, estado: 'vencido' },
    };

    // Act
    const accion = () => aplicarCupon('VIEJO10', subtotal, volumen, catalogo);

    // Assert
    expect(accion).toThrow('Cupón inválido');
  });

  test('sin cupón conserva el descuento por volumen y cobra el envío', () => {
    // Arrange
    const subtotal = 228000;
    const volumen = calcularDescuentoVolumen(subtotal);

    // Act
    const resultado = aplicarCupon(undefined, subtotal, volumen);

    // Assert
    expect(resultado.descuento).toBe(11400);
    expect(resultado.envioGratis).toBe(false);
  });

  test('rechaza un subtotal negativo', () => {
    // Arrange
    const volumen = { tarifa: 0, descuento: 0, totalConDescuento: 0 };

    // Act
    const accion = () => aplicarCupon('SABANERO10', -1, volumen);

    // Assert
    expect(accion).toThrow('El subtotal debe ser un número mayor o igual a 0');
  });
});