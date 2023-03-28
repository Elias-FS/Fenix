import { Request, Response } from 'express'
import CompanyModel from '../database/CompanyModel'

const CompanyController = {
  async index(req: Request, res: Response): Promise<Response> {
    const companies = await CompanyModel.find()

    return res.json(companies)
  },

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const company = await CompanyModel.findById(id)

    return res.json(company)
  },

  async create(req: Request, res: Response): Promise<Response> {
    const company = await CompanyModel.create(req.body)

    return res.json(company)
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const company = await CompanyModel.findByIdAndUpdate(id, req.body)

    return res.json(company)
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const company = await CompanyModel.findByIdAndRemove(id)

    return res.json(company)
  },
}

export default CompanyController
