const CUPONES = {
  SABANERO10: { tipo: 'porcentaje', valor: 10, subtotalMinimo: 50000, estado: 'vigente' },
  ENVIOGRATIS: { tipo: 'envio', estado: 'vigente' },
};

function aplicarCupon(codigo, subtotal, volumen, catalogo = CUPONES) {
  if (!Number.isFinite(subtotal) || subtotal < 0) {
    throw new Error('El subtotal debe ser un número mayor o igual a 0');
  }

  if (codigo === undefined || codigo === null) {
    return { ...volumen, envioGratis: false };
  }

  const cupon = catalogo[codigo];
  if (!cupon || cupon.estado !== 'vigente') {
    throw new Error('Cupón inválido');
  }

  if (cupon.tipo === 'envio') {
    return { ...volumen, envioGratis: true };
  }

  if (subtotal < cupon.subtotalMinimo) {
    throw new Error(
      `El cupón ${codigo} requiere un subtotal mínimo de ${cupon.subtotalMinimo}`
    );
  }

  const descuentoCupon = (subtotal * cupon.valor) / 100;
  if (descuentoCupon > volumen.descuento) {
    return {
      tarifa: cupon.valor,
      descuento: descuentoCupon,
      totalConDescuento: subtotal - descuentoCupon,
      envioGratis: false,
    };
  }

  return { ...volumen, envioGratis: false };
}

module.exports = { aplicarCupon };