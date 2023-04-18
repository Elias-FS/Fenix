import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/UserModel'
import bcrypt from 'bcrypt'

async function checkUserExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body

  const user = await UserModel.findOne({ email })

  if (!user) {
    return res.status(400).json({
      error: 'E-mail or password is incorrect',
    })
  }

  const verifyPass = await bcrypt.compare(password, user.password ?? '')

  if (!verifyPass) {
    return res.status(400).json({
      error: 'E-mail or password is incorrect',
    })
  }

  // Passa o controle para o próximo middleware
  next()
}

export default checkUserExists
