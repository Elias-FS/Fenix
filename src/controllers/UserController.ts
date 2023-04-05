import { Request, Response } from 'express'
import UserModel from '../models/UserModel'

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
    const user = await UserModel.create(req.body)

    return res.json(user)
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
