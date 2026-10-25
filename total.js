function calcularTotal({ subtotal, descuento, iva, envio }) {
  const valores = [subtotal, descuento, iva, envio];
  if (valores.some((valor) => !Number.isFinite(valor) || valor < 0)) {
    throw new Error(
      'Los valores de la liquidación deben ser números mayores o iguales a 0'
    );
  }

  return Math.round(subtotal - descuento + iva + envio);
}

module.exports = { calcularTotal };