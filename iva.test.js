const { calcularIVA } = require('./iva');

describe('HU-02: Calcular el IVA', () => {
  test.each([
    [0, 100000, 0],
    [5, 100000, 5000],
    [19, 100000, 19000],
  ])('calcula el IVA del %i%% sobre el precio de %i', (tarifa, precio, iva) => {
    // Arrange
    const descuento = 0;

    // Act
    const resultado = calcularIVA(precio, tarifa, descuento);

    // Assert
    expect(resultado).toBe(iva);
  });

  test('calcula el IVA sobre el precio después de aplicar el descuento', () => {
    // Arrange
    const precio = 180000;
    const tarifa = 19;
    const descuento = 5;

    // Act
    const resultado = calcularIVA(precio, tarifa, descuento);

    // Assert
    expect(resultado).toBe(32490);
  });

  test('rechaza una tarifa de IVA no permitida', () => {
    // Arrange
    const precio = 100000;
    const tarifaNoPermitida = 10;

    // Act
    const accion = () => calcularIVA(precio, tarifaNoPermitida);

    // Assert
    expect(accion).toThrow('La tarifa de IVA debe ser 0, 5 o 19');
  });

  test('rechaza descuentos fuera del rango permitido', () => {
    // Arrange
    const precio = 100000;
    const tarifa = 19;

    // Act
    const accion = () => calcularIVA(precio, tarifa, 101);

    // Assert
    expect(accion).toThrow('El descuento debe estar entre 0 y 100');
  });
});
