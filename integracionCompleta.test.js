const { calcularIVA } = require('./iva');
const { calcularDescuentoVolumen } = require('./descuentoVolumen');
const { aplicarCupon } = require('./cupones');
const { calcularEnvio } = require('./envio');
const { calcularTotal } = require('./total');
const { calcularPuntos } = require('./puntos');

describe('Integración completa: ejemplo del taller (HU-01 a HU-06)', () => {
  test('cliente ESTANDAR en Sincelejo, sin cupón, paga $250.515 y recibe 250 puntos', () => {
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
    const volumen = calcularDescuentoVolumen(subtotal);
    const descuentos = aplicarCupon(undefined, subtotal, volumen);
    const iva = productos.reduce(
      (suma, producto) =>
        suma +
        calcularIVA(
          producto.precio * producto.cantidad,
          producto.tarifaIVA,
          descuentos.tarifa
        ),
      0
    );
    const productosConIVA = subtotal - descuentos.descuento + iva;
    const envio = calcularEnvio('Sincelejo', productosConIVA, descuentos.envioGratis);
    const total = calcularTotal({ subtotal, descuento: descuentos.descuento, iva, envio });
    const puntos = calcularPuntos(total - envio, 'ESTANDAR');

    // Assert
    expect(subtotal).toBe(228000);
    expect(descuentos.descuento).toBe(11400);
    expect(iva).toBe(33915);
    expect(envio).toBe(0);
    expect(total).toBe(250515);
    expect(puntos).toBe(250);
  });
});