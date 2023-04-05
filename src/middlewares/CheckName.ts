import { Request, Response, NextFunction } from 'express'
import TeamModel from '../models/TeamModel'

async function checkName(req: Request, res: Response, next: NextFunction) {
  const { title } = req.body

  const existingNameTeam = await TeamModel.findOne({ title })

  if (existingNameTeam) {
    return res.status(400).json({
      error: `Já existe uma equipe com o nome ${title}`,
    })
  }

  // Passa o controle para o próximo middleware
  next()
}

export default checkName
