import { Request, Response } from 'express'
import MemberModel from '../database/MemberModel'

const MemberController = {
  async index(req: Request, res: Response): Promise<Response> {
    const members = await MemberModel.find()

    return res.json(members)
  },

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const member = await MemberModel.findById(id)

    return res.json(member)
  },

  async create(req: Request, res: Response): Promise<Response> {
    const member = await MemberModel.create(req.body)

    return res.json(member)
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const member = await MemberModel.findByIdAndUpdate(id, req.body)

    return res.json(member)
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const member = await MemberModel.findByIdAndRemove(id)

    return res.json(member)
  },
}

export default MemberController
