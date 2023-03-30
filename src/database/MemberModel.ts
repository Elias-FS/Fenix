import mongoose, { Schema } from 'mongoose'

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
  STATUS: 'Status',
})

const MemberModel = new Schema(
  {
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
    mobile: String,
    email: String,
    password: String,
    type: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.TECHNICAL, // Valor padrão é 'tecnico'
    },
  },
  { timestamps: true },
)

export default mongoose.model('Member', MemberModel)
