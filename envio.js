const MUNICIPIO_BASE = 'Sincelejo';
const ENVIO_MUNICIPIO_BASE = 8000;
const ENVIO_OTROS_MUNICIPIOS = 15000;
const MINIMO_ENVIO_GRATIS = 150000;

function calcularEnvio(municipio, valorProductosConIVA, envioGratisPorCupon = false) {
  if (typeof municipio !== 'string' || municipio.trim() === '') {
    throw new Error('El municipio es obligatorio');
  }

  if (!Number.isFinite(valorProductosConIVA) || valorProductosConIVA < 0) {
    throw new Error(
      'El valor de los productos con IVA debe ser un número mayor o igual a 0'
    );
  }

  if (envioGratisPorCupon || valorProductosConIVA >= MINIMO_ENVIO_GRATIS) {
    return 0;
  }

  return municipio.trim() === MUNICIPIO_BASE
    ? ENVIO_MUNICIPIO_BASE
    : ENVIO_OTROS_MUNICIPIOS;
}

module.exports = { calcularEnvio };