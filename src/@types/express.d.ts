/* eslint-disable no-unused-vars */
import User from '../models/UserModel'

declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>
    }
  }
}
