import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Файлы с хэшем в имени (main-XXXXXXXX.js, styles-XXXXXXXX.css, шрифты):
 * при изменении содержимого меняется и имя, поэтому их безопасно кэшировать на год.
 */
const HASHED_ASSET = /-[A-Za-z0-9]{8}\.(?:js|css|woff2?|ttf)$/;

/**
 * Serve static files from /browser
 *
 * Раньше для ВСЕХ файлов стояло maxAge: '1y' — из-за этого favicon, картинки и т.п.
 * (у них нет хэша в имени) браузер держал год и не видел обновлений.
 * Теперь: хэшированные файлы — на год, остальное — с обязательной перепроверкой (ETag).
 */
app.use(
  express.static(browserDistFolder, {
    index: false,
    redirect: false,
    setHeaders: (res, filePath) => {
      if (HASHED_ASSET.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 * HTML не кэшируем, чтобы после деплоя сразу приходили актуальные title и иконка.
 */
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'private, no-cache');
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);