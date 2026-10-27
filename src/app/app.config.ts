// ============================================================
// app.config.ts
// Configuración global de la aplicación. Aquí se registran los
// "providers": servicios que Angular pone a disposición de toda la app.
// ============================================================
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // Captura errores no controlados del navegador (viene por defecto).
    provideBrowserGlobalErrorListeners(),
    // Habilita HttpClient, necesario para hacer peticiones a la API.
    // Sin esto aparece: "NullInjectorError: No provider for HttpClient".
    provideHttpClient(),
  ]
};
