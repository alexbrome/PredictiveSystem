import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Configura un timeout personalizado para solicitudes y respuestas
  server.use((req, res, next) => {
    req.setTimeout(60000); // Tiempo en milisegundos (60 segundos)
    res.setTimeout(60000); // Tiempo en milisegundos (60 segundos)
    next();
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    // Establecer un timeout en el proceso de renderizado
    const renderPromise = commonEngine.render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    });

    // Timeout personalizado para la promesa de renderizado (60 segundos)
    const timeoutPromise = new Promise<string>((_, reject) =>
      setTimeout(() => reject('Timeout exceeded during SSR rendering'), 60000) // 60 segundos
    );

    // Hacer un race entre la promesa de renderizado y el timeout
    Promise.race([renderPromise, timeoutPromise])
      .then((html) => res.send(html))
      .catch((err) => {
        console.error('Error en el renderizado SSR:', err);
        next(err);
      });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();

  // Configura el timeout para el servidor HTTP
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  }).setTimeout(60000); // Tiempo en milisegundos (60 segundos)
}

run();
