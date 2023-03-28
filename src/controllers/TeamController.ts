import { Request, Response } from 'express'
import TeamModel from '../database/TeamModel'

const TeamController = {
  async index(req: Request, res: Response): Promise<Response> {
    const teams = await TeamModel.find()

    return res.json(teams)
  },

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const team = await TeamModel.findById(id)

    return res.json(team)
  },

  async create(req: Request, res: Response): Promise<Response> {
    const team = await TeamModel.create(req.body)

    return res.json(team)
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const team = await TeamModel.findByIdAndUpdate(id, req.body)

    return res.json(team)
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const team = await TeamModel.findByIdAndRemove(id)

    return res.json(team)
  },
}

export default TeamController
