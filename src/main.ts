// Punto de entrada de la aplicación Angular.
// Arranca (bootstrap) el componente principal App usando la
// configuración global definida en app.config.ts.
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err)); // muestra en consola cualquier error al iniciar
