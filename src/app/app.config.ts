import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyAcFtt72V_5YhVA__lY6zK1-TfvF8SEboc',
        authDomain: 'library-403f2.firebaseapp.com',
        projectId: 'library-403f2',
        storageBucket: 'library-403f2.firebasestorage.app',
        messagingSenderId: '299927670955',
        appId: '1:299927670955:web:e2dee4ec381a97312fa7ee',
        measurementId: 'G-09H2QZ740T',
      }),
    ),
    provideFirestore(() => getFirestore()),
  ],
};
