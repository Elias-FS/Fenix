import mongoose, { Schema } from 'mongoose'

// Definir enum para funções
const RoleEnum = Object.freeze({
  ADMIN: 'administrador',
  TECH: 'tecnico',
})

// Definir enum para status
const StatusEnum = Object.freeze({
  ACTIVE: 'ativo',
  INACTIVE: 'inativo',
})

const TeamModel = new Schema(
  {
    title: {
      type: 'string',
      default: 'Team',
    },
    type: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.TECH, // Valor padrão é 'tecnico'
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.ACTIVE, // Valor padrão é 'ativo'
    },
    members: [],
  },
  { timestamps: true },
)

export default mongoose.model('Team', TeamModel)
