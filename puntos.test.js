const { calcularPuntos } = require('./puntos');

describe('HU-06: Acumular puntos', () => {
  test.each([
    [0, 0],
    [999, 0],
    [1000, 1],
    [1999, 1],
    [2000, 2],
    [250515, 250],
  ])(
    'cliente ESTANDAR con un total sin envío de %i recibe %i puntos',
    (total, puntosEsperados) => {
      // Arrange
      const categoria = 'ESTANDAR';

      // Act
      const puntos = calcularPuntos(total, categoria);

      // Assert
      expect(puntos).toBe(puntosEsperados);
    }
  );

  test.each([[-1], [NaN], [Infinity]])(
    'rechaza un total inválido (%p)',
    (total) => {
      // Arrange
      const categoria = 'ESTANDAR';

      // Act
      const accion = () => calcularPuntos(total, categoria);

      // Assert
      expect(accion).toThrow('El total debe ser un número mayor o igual a 0');
    }
  );
  test.each([
    [999, 0],
    [1000, 2],
    [1999, 2],
    [250515, 500],
  ])(
    'cliente ORO con un total sin envío de %i recibe %i puntos (el doble)',
    (total, puntosEsperados) => {
      // Arrange
      const categoria = 'ORO';

      // Act
      const puntos = calcularPuntos(total, categoria);

      // Assert
      expect(puntos).toBe(puntosEsperados);
    }
  );

  test.each([['PLATA'], [undefined], ['oro']])(
    'rechaza una categoría de cliente no permitida (%p)',
    (categoria) => {
      // Arrange
      const total = 50000;

      // Act
      const accion = () => calcularPuntos(total, categoria);

      // Assert
      expect(accion).toThrow('La categoría debe ser ESTANDAR u ORO');
    }
  );
});
