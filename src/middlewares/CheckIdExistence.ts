import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import OrganizationModel from '../models/OrganizationModel'
import UserModel from '../models/UserModel'
import TeamModel from '../models/TeamModel'

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

  const organization = await OrganizationModel.findById(id)
  const team = await TeamModel.findById(id)
  const user = await UserModel.findById(id)

  if (!organization && !team && !user) {
    return res.status(404).json({ error: 'id not found' })
  }

  // Passa o controle para o próximo middleware
  next()
}

export default checkIdExistence
