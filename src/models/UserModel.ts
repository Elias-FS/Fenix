import mongoose, { Schema } from 'mongoose'

// Definir enum para status
const StatusEnum = Object.freeze({
  ACTIVE: 'active',
  INACTIVE: 'inactive',
})

// Definir enum para tipos de documentos
const TypeDocumentEnum = Object.freeze({
  CPF: 'CPF',
  CNPJ: 'CNPJ',
})

// Definir enum para funções
const RoleEnum = Object.freeze({
  TECHNICAL: 'Technical',
  MANAGER: 'Manager',
  PUBLIC: 'Public',
  MARKETING: 'Marketing',
  API: 'API',
})

const UserModel = new Schema(
  {
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
      populate: 'teams',
    },
    name: String,
    lastname: String,
    typeDocument: {
      type: String,
      required: true,
      enum: Object.values(TypeDocumentEnum),
      default: TypeDocumentEnum.CPF, // Valor padrão é 'CPF'
    },
    document: String,
    slug: String,
    mobile: Number,
    email: String,
    password: String,
    userToken: String,
    type: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.TECHNICAL, // Valor padrão é 'tecnico'
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.ACTIVE, // Valor padrão é 'active'
    },
  },
  { timestamps: true },
)

export default mongoose.model('User', UserModel)
