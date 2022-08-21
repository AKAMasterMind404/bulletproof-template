import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import express from 'express';

import Logger from './loaders/logger';

import socketLoader from "./loaders/socket";

async function startServer() {
  const app = express();
  const socket = socketLoader(app);
  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, () => {
    Logger.info(`
    ################################################
    🛡️ Database Server connected on : ${config.databaseURL} 🛡️
    ################################################
  `);
    
    Logger.info(`
      ################################################
      🛡️ bulletproof-template Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });

}

startServer();
