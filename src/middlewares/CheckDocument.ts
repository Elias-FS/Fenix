import { Request, Response, NextFunction } from 'express'
import OrganizationModel from '../models/OrganizationModel'
import UserModel from '../models/UserModel'

async function checkDocument(req: Request, res: Response, next: NextFunction) {
  const { document, typeDocument } = req.body

  const documentOrganization = await OrganizationModel.findOne({ document })
  const documentUser = await UserModel.findOne({ document })

  if (typeDocument === 'CNPJ' && document.length !== 14) {
    return res.status(400).json({
      error:
        'O CNPJ precisa ter exatamente 14 digitos, no seguinte formato: "12312312312312"',
    })
  }

  if (typeDocument === 'CPF' && document.length !== 11) {
    return res.status(400).json({
      error:
        'O CPF precisa ter exatamente 11 digitos, no seguinte formato: 12312312312',
    })
  }

  if (documentOrganization || documentUser) {
    return res.status(500).json({
      error: `Já existe um cadastro com o documento ${document}`,
    })
  }

  // Passa o controle para o próximo middleware
  next()
}

export default checkDocument
