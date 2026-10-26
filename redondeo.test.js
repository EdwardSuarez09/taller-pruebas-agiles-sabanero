const { calcularIVA } = require('./iva');
const { calcularDescuentoVolumen } = require('./descuentoVolumen');
const { aplicarCupon } = require('./cupones');

describe('Defectos de redondeo: valores en pesos sin decimales', () => {
  test('DEF-01: el IVA se redondea al peso más cercano', () => {
    // Arrange
    const precio = 4501;
    const tarifa = 19;
    const descuento = 5;

    // Act
    const iva = calcularIVA(precio, tarifa, descuento);

    // Assert
    expect(iva).toBe(812);
  });

  test('DEF-02: el descuento del cupón se redondea al peso más cercano', () => {
    // Arrange
    const subtotal = 50005;
    const volumen = calcularDescuentoVolumen(subtotal);

    // Act
    const resultado = aplicarCupon('SABANERO10', subtotal, volumen);

    // Assert
    expect(resultado.descuento).toBe(5001);
    expect(resultado.totalConDescuento).toBe(45004);
  });
});