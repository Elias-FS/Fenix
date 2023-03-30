import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import CompanyModel from '../database/CompanyModel'
import MemberModel from '../database/MemberModel'
import TeamModel from '../database/TeamModel'

async function checkIdExistence(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  if (!id) {
    return res.status(400).json({ error: 'ID not provided' })
  }

  const company = await CompanyModel.findById(id)
  const team = await TeamModel.findById(id)
  const member = await MemberModel.findById(id)

  if (!company && !team && !member) {
    return res.status(404).json({ error: 'id not found' })
  }

  // Passa o controle para o próximo middleware
  next()
}

export default checkIdExistence
