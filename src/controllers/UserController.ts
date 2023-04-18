import { Request, Response } from 'express'
import UserModel from '../models/UserModel'
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

const UserController = {
  async index(req: Request, res: Response): Promise<Response> {
    const users = await UserModel.find().populate('team_id')

    return res.json(users)
  },

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const user = await UserModel.findById(id)

    return res.json(user)
  },

  async create(req: Request, res: Response): Promise<Response> {
    const {
      // eslint-disable-next-line camelcase
      team_id,
      name,
      lastname,
      typeDocument,
      document,
      slug,
      mobile,
      email,
      password,
      type,
    } = req.body

    const hashPassword = await bcrypt.hash(password, 10)
    const token = uuidV4()

    const newUser = await UserModel.create({
      // eslint-disable-next-line camelcase
      team_id,
      name,
      lastname,
      typeDocument,
      document,
      slug,
      mobile,
      email,
      password: hashPassword,
      userToken: token,
      type,
    })

    const userWithoutPassword = {
      _id: newUser._id,
      team_id: newUser.team_id,
      name: newUser.name,
      lastname: newUser.lastname,
      typeDocument: newUser.typeDocument,
      document: newUser.document,
      slug: newUser.slug,
      mobile: newUser.mobile,
      email: newUser.email,
      userToken: newUser.userToken,
      type: newUser.type,
    }

    return res.status(201).json(userWithoutPassword)
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const user = await UserModel.findByIdAndUpdate(id, req.body)

    return res.json(user)
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const user = await UserModel.findByIdAndRemove(id)

    return res.json(user)
  },
}

export default UserController
