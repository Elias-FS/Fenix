import { Request, Response, NextFunction } from 'express'
import CompanyController from '../controllers/CompanyController'

async function checkDocumentExistence(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { document } = req.body

  const companyDocumentAlreadyExists = await CompanyController.findByDocument

  if (companyDocumentAlreadyExists === document) {
    throw new Error(
      `Um registro com o documento ${document} já está cadastrado`,
    )
  }

  // Passa o controle para o próximo middleware
  next()
}

export default checkDocumentExistence
