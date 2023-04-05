import mongoose, { Schema } from 'mongoose'

// Definir enum para funções
const RoleEnum = Object.freeze({
  TECHNICAL: 'Technical',
  MANAGER: 'Manager',
})

// Definir enum para status
const StatusEnum = Object.freeze({
  ACTIVE: 'active',
  INACTIVE: 'inactive',
})

const TeamModel = new Schema(
  {
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    title: {
      type: String,
      default: 'Team',
    },
    type: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.MANAGER, // Valor padrão é 'Manager'
    },
    role: String,
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.ACTIVE, // Valor padrão é 'active'
    },
  },
  { timestamps: true },
)

export default mongoose.model('Team', TeamModel)
