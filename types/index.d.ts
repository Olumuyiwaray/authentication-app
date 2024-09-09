import express from 'express';
import { Express } from 'express';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        sub: string;
        username: string;
        roles: string;
      };
    }
  }
}
