import { Request, Response } from 'express'
import UserModel from '../models/UserModel'
import jwt from 'jsonwebtoken'
import { env } from '../env'

// type JwtPayload = {
//   userToken: String
// }

const UserLoginController = {
  async login(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    const user = await UserModel.findOne({ email })

    const token = jwt.sign(
      {
        name: user?.name,
        lastname: user?.lastname,
        status: user?.status,
        type: user?.type,
        userToken: user?.userToken,
      },
      env.JWT_PASS,
      {
        expiresIn: 60 * 60 * 3,
      },
    )

    return res.json({
      name: user?.name,
      lastname: user?.lastname,
      status: user?.status,
      type: user?.type,
      userToken: user?.userToken,
      token,
    })
  },

  async getProfile(req: Request, res: Response): Promise<Response> {
    return res.json(req.user)

    // const { authorization } = req.headers

    // if (!authorization) {
    //   return res.status(401).json({
    //     error: 'Not authorized',
    //   })
    // }

    // const token = authorization.split(' ')[1]

    // const { userToken } = jwt.verify(token, env.JWT_PASS) as JwtPayload

    // const user = await UserModel.findOne({ userToken })

    // if (!user) {
    //   return res.status(401).json({
    //     error: 'Not authorized',
    //   })
    // }

    // return res.json({
    //   name: user?.name,
    //   lastname: user?.lastname,
    //   status: user?.status,
    //   type: user?.type,
    //   userToken: user?.userToken,
    // })
  },
}

export default UserLoginController
