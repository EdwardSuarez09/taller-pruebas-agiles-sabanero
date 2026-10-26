const { calcularEnvio } = require('./envio');

describe('HU-05: Calcular el envío', () => {
  test('cobra 8000 de envío dentro de Sincelejo', () => {
    // Arrange
    const municipio = 'Sincelejo';

    // Act
    const envio = calcularEnvio(municipio, 100000);

    // Assert
    expect(envio).toBe(8000);
  });

  test('cobra 15000 de envío a otros municipios de Sucre', () => {
    // Arrange
    const municipio = 'Corozal';

    // Act
    const envio = calcularEnvio(municipio, 100000);

    // Assert
    expect(envio).toBe(15000);
  });

  test.each([
    ['Sincelejo', 149999, 8000],
    ['Sincelejo', 150000, 0],
    ['Corozal', 149999, 15000],
    ['Corozal', 150000, 0],
  ])(
    'envío a %s con productos con IVA por %i cuesta %i',
    (municipio, valorProductosConIVA, envioEsperado) => {
      // Arrange
      const valor = valorProductosConIVA;

      // Act
      const envio = calcularEnvio(municipio, valor);

      // Assert
      expect(envio).toBe(envioEsperado);
    }
  );

  test.each([[undefined], [''], ['   ']])(
    'rechaza un municipio vacío (%p)',
    (municipio) => {
      // Arrange
      const valor = 100000;

      // Act
      const accion = () => calcularEnvio(municipio, valor);

      // Assert
      expect(accion).toThrow('El municipio es obligatorio');
    }
  );

  test.each([[-1], [NaN]])(
    'rechaza un valor de productos con IVA inválido (%p)',
    (valor) => {
      // Arrange
      const municipio = 'Sincelejo';

      // Act
      const accion = () => calcularEnvio(municipio, valor);

      // Assert
      expect(accion).toThrow(
        'El valor de los productos con IVA debe ser un número mayor o igual a 0'
      );
    }
  );
  test('el cupón ENVIOGRATIS deja el envío en 0 en otro municipio', () => {
    // Arrange
    const municipio = 'Corozal';
    const envioGratisPorCupon = true;

    // Act
    const envio = calcularEnvio(municipio, 100000, envioGratisPorCupon);

    // Assert
    expect(envio).toBe(0);
  });
});