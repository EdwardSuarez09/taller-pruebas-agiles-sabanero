function aplicarCupon(codigo, subtotal, volumen) {
  if (codigo === 'SABANERO10') {
    if (subtotal < 50000) {
      throw new Error('El cupón SABANERO10 requiere un subtotal mínimo de 50000');
    }
    const descuentoCupon = (subtotal * 10) / 100;
    if (descuentoCupon > volumen.descuento) {
      return {
        tarifa: 10,
        descuento: descuentoCupon,
        totalConDescuento: subtotal - descuentoCupon,
        envioGratis: false,
      };
    }
  }
  return { ...volumen, envioGratis: false };
}

module.exports = { aplicarCupon };