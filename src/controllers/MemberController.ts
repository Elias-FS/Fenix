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
    const { document, typeDocument } = req.body

    const existingCompany = await MemberModel.findOne({ document })

    if (typeDocument === 'CPF' && document.length !== 11) {
      return res.status(400).json({
        error:
          'O CPF precisa ter exatamente 11 digitos, no seguinte formato: 12312312312',
      })
    } else if (typeDocument === 'CNPJ' && document.length !== 14) {
      return res.status(400).json({
        error:
          'O CNPJ precisa ter exatamente 14 digitos, no seguinte formato: "12312312312312"',
      })
    }

    if (existingCompany) {
      return res.status(400).json({
        error: `Já existe um membro com o documento ${document}`,
      })
    }

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
