import { Request, Response } from 'express'
import OrganizationModel from '../models/OrganizationModel'
import TeamModel from '../models/TeamModel'

const OrganizationController = {
  async index(req: Request, res: Response): Promise<Response> {
    const organizations = await OrganizationModel.find()

    return res.json(organizations)
  },

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const organization = await OrganizationModel.findById(id)

    return res.json(organization)
  },

  async create(req: Request, res: Response): Promise<Response> {
    const organization = await OrganizationModel.create(req.body)

    const defaultTeam = await TeamModel.create({
      organization_id: organization._id,
      title: `default team ${organization.title}`,
      type: 'Technical',
      role: 'default',
      status: 'active',
    })

    /** Usuário Default
    const defaultUser = await UserModel.create({
      team_id: defaultTeam._id,
      name: 'Usuário',
      lastname: 'Padrão',
      typeDocument: 'CPF',
      document: '11111111111',
      slug: 'Tecnologia',
      mobile: '',
      email: '',
      password: 'senha123',
      type: 'Technical',
    })
    */

    return res.status(201).json({ organization, defaultTeam })
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const organization = await OrganizationModel.findByIdAndUpdate(id, req.body)

    return res.json(organization)
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const organization = await OrganizationModel.findByIdAndRemove(id)

    return res.json(organization)
  },
}

export default OrganizationController
