# Mercado Sabanero: liquidación de compras con TDD

Módulo de lógica de negocio que liquida una compra de la tienda Mercado Sabanero (Sincelejo, Sucre). Está hecho en JavaScript (CommonJS) con Node.js y se prueba con Jest.

## Requisitos
- Node.js 18 o superior
- Git

## Instalación
```
git clone https://github.com/EdwardSuarez09/taller-pruebas-agiles-sabanero.git
cd taller-pruebas-agiles-sabanero
npm install
```

## Ejecutar las pruebas
```
npm test
```
Para ver cada prueba por nombre en un solo archivo:
```
npm test -- --runInBand cupones.test.js
```

## Reporte de cobertura
```
npm run coverage
```
El resumen sale en la terminal y el reporte en HTML queda en `coverage/lcov-report/index.html`.

## Estructura
| Archivo | Historia de usuario |
|---|---|
| carrito.js | HU-01 Agregar productos al carrito |
| iva.js | HU-02 Calcular el IVA |
| descuentoVolumen.js | HU-03 Descuento por volumen |
| cupones.js | HU-04 Usar cupones |
| envio.js y total.js | HU-05 Calcular el envío y el total |
| puntos.js | HU-06 Acumular puntos |
| *.test.js | Pruebas unitarias y de integración de cada módulo |

## Decisiones de diseño
- Los valores están en pesos y se redondean al peso más cercano.
- El estado de un cupón (vigente o vencido) se guarda de forma explícita en el catálogo de cupones; no se usan fechas.
- Si el subtotal es de al menos 50.000 y hay descuento por volumen, con SABANERO10 solo se aplica el descuento mayor.
- Los productos con IVA para el envío gratis se calculan como subtotal menos descuento más IVA.
- Cualquier municipio distinto de Sincelejo se trata como otro municipio de Sucre.
- Los puntos se calculan sobre el total pagado sin envío.

## Flujo de trabajo
Cada historia se desarrolló con TDD: un commit test: con la prueba en rojo, un commit feat: con el código mínimo que la pasa y, cuando hubo una mejora real, un commit refactor:.

## Equipo
- Eduar Suárez: HU-01, HU-02 y HU-03
- Ireth: HU-04, HU-05 y HU-06