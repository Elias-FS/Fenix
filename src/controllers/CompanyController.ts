import { Request, Response } from 'express'
import CompanyModel from '../models/CompanyModel'
import MemberModel from '../models/MemberModel'
import TeamModel from '../models/TeamModel'

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
    const { document, typeDocument } = req.body

    const existingCompany = await CompanyModel.findOne({ document })

    if (typeDocument === 'CNPJ' && document.length !== 14) {
      return res.status(400).json({
        error:
          'O CNPJ precisa ter exatamente 14 digitos, no seguinte formato: "12312312312312"',
      })
    }

    if (existingCompany) {
      return res.status(400).json({
        error: `Já existe uma companhia com o documento ${document}`,
      })
    }

    const company = await CompanyModel.create(req.body)

    const defaultTeam = await TeamModel.create({
      organization_id: company._id,
      title: 'default team',
      type: 'Technical',
      role: 'default',
      status: 'ativo',
    })

    const defaultMember = await MemberModel.create({
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

    return res.json({ company, defaultTeam, defaultMember })
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
