Proyecto Cotizador de Seguros de Salud
Aplicación web simple para la cotización de seguros de salud, desarrollada como parte de un desafío de front-end. Permite a los usuarios ingresar sus datos, seleccionar un plan y ver un resumen.

Stack Tecnológico
Framework: Next.js 15 (App Router)

Lenguaje: TypeScript

UI: React

Estilos: SASS Modules

Manejo de Estado Global: React Context API

Llamadas API: fetch nativo

Testing: Jest, React Testing Library

Flujo de la Aplicación
Inicio (/): Formulario para datos del usuario.

Planes (/planes): Selección de planes (para el usuario o para otro), con filtrado por edad y ajuste de precios.

Resumen (/resumen): Muestra la cotización final.

Scripts Disponibles
En el directorio del proyecto, puedes ejecutar:

npm run dev o yarn dev
Ejecuta la aplicación en modo de desarrollo.
Abre http://localhost:3000 para verla en tu navegador.

npm run build o yarn build
Construye la aplicación para producción en la carpeta .next.

npm start o yarn start
Inicia un servidor de producción de Next.js. Requiere haber ejecutado build primero.

npm test o yarn test
Ejecuta los tests utilizando Jest.

Estructura del Proyecto
/app: Contiene las rutas y páginas principales de la aplicación, incluyendo los tests (\*.test.tsx) junto a cada página.

/components: Componentes de UI reutilizables.

/lib: Lógica centralizada (API, Contexto, Definiciones de Tipos, Hooks).

/assets: Archivos estáticos (imágenes, fuentes, iconos).

/styles: Estilos globales y variables SASS.
