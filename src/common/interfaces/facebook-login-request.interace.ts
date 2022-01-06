import { Request } from 'express';

export interface IFacebookLoginRequestInterace extends Request {
  user: string;
}