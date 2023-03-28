import mongoose, { Schema } from 'mongoose'

// Definir enum para status
const StatusEnum = Object.freeze({
  ACTIVE: 'active',
  INACTIVE: 'inactive',
})

// Definir esquema para a equipe padrão
const DefaultTeam = new Schema({
  name: String,
  description: String,
})

const CompanyModel = new Schema(
  {
    title: String,
    document: String,
    slug: String,
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.ACTIVE, // Valor padrão é 'ativo'
    },
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
    defaultTeam: {
      type: DefaultTeam,
      default: {
        name: 'Default Team',
        description: 'This is the default team',
        status: {
          type: String,
          enum: Object.values(StatusEnum),
          default: StatusEnum.ACTIVE, // Valor padrão é 'ativo'
        },
      },
    },
  },
  { timestamps: true },
)

export default mongoose.model('Company', CompanyModel)
