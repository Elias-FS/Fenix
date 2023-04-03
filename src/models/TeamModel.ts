import mongoose, { Schema } from 'mongoose'

// Definir enum para funções
const RoleEnum = Object.freeze({
  TECHNICAL: 'Technical',
  ADMINISTRATOR: 'administrator',
})

// Definir enum para status
const StatusEnum = Object.freeze({
  ACTIVE: 'ativo',
  INACTIVE: 'inativo',
})

const TeamModel = new Schema(
  {
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    title: {
      type: String,
      default: 'Team',
    },
    type: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.TECHNICAL, // Valor padrão é 'tecnico'
    },
    role: String,
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
