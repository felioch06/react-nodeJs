import express from "express";
import 'reflect-metadata';

async function startServer() {
    const app = express();

    await require('./src/loaders').default({ expressApp: app });

    await app.listen(3001);
    console.info(`Server listening on port: 3001`);
}

startServer();