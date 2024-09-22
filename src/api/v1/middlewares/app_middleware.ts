import express, { Express } from 'express';

export const handleAppMiddleware = (app: Express) => {
  // parses incoming requests with JSON payloads
  app.use(express.json());
};
