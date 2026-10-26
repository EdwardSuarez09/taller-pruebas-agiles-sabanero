const CUPONES = {
  SABANERO10: { tipo: 'porcentaje', valor: 10, subtotalMinimo: 50000, estado: 'vigente' },
  ENVIOGRATIS: { tipo: 'envio', estado: 'vigente' },
};

const conEnvio = (volumen, envioGratis) => ({ ...volumen, envioGratis });

function aplicarCupon(codigo, subtotal, volumen, catalogo = CUPONES) {
  if (!Number.isFinite(subtotal) || subtotal < 0) {
    throw new Error('El subtotal debe ser un número mayor o igual a 0');
  }

  if (codigo === undefined || codigo === null) {
    return conEnvio(volumen, false);
  }

  const cupon = catalogo[codigo];
  if (!cupon || cupon.estado !== 'vigente') {
    throw new Error('Cupón inválido');
  }

  if (cupon.tipo === 'envio') {
    return conEnvio(volumen, true);
  }

  if (subtotal < cupon.subtotalMinimo) {
    throw new Error(`El cupón ${codigo} requiere un subtotal mínimo de ${cupon.subtotalMinimo}`);
  }

  const descuentoCupon = Math.round((subtotal * cupon.valor) / 100);
  if (descuentoCupon > volumen.descuento) {
    return {
      tarifa: cupon.valor,
      descuento: descuentoCupon,
      totalConDescuento: subtotal - descuentoCupon,
      envioGratis: false,
    };
  }

  return conEnvio(volumen, false);
}

module.exports = { aplicarCupon };