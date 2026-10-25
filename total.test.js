const { calcularTotal } = require('./total');

describe('HU-05: Calcular el total', () => {
  test('total = subtotal - descuento + IVA + envío con envío gratis', () => {
    // Arrange
    const liquidacion = { subtotal: 228000, descuento: 11400, iva: 33915, envio: 0 };

    // Act
    const total = calcularTotal(liquidacion);

    // Assert
    expect(total).toBe(250515);
  });

  test('suma el envío cuando no es gratis', () => {
    // Arrange
    const liquidacion = { subtotal: 100000, descuento: 0, iva: 19000, envio: 8000 };

    // Act
    const total = calcularTotal(liquidacion);

    // Assert
    expect(total).toBe(127000);
  });

  test('redondea el total al peso más cercano', () => {
    // Arrange
    const liquidacion = { subtotal: 100001, descuento: 5000.05, iva: 812.4305, envio: 0 };

    // Act
    const total = calcularTotal(liquidacion);

    // Assert
    expect(total).toBe(95813);
  });

  test.each([
    [{ subtotal: -1, descuento: 0, iva: 0, envio: 0 }],
    [{ subtotal: 1000, descuento: NaN, iva: 0, envio: 0 }],
    [{ subtotal: 1000, descuento: 0, iva: 0, envio: -8000 }],
  ])('rechaza valores de liquidación inválidos (%j)', (liquidacion) => {
    // Arrange
    const datos = liquidacion;

    // Act
    const accion = () => calcularTotal(datos);

    // Assert
    expect(accion).toThrow(
      'Los valores de la liquidación deben ser números mayores o iguales a 0'
    );
  });
});