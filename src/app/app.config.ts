import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { authInterceptor } from './interceptors/auth-interceptor';
import { errorInterceptor } from './interceptors/error-interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Chaîne finale : auth (ajoute le Bearer) puis gestion des erreurs.
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    // Routing + binding des paramètres de route vers les input() des composants.
    provideRouter(routes, withComponentInputBinding()),
  ],
};
