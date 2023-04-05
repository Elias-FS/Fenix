import mongoose, { Schema } from 'mongoose'

// Definir enum para status
const StatusEnum = Object.freeze({
  ACTIVE: 'active',
  INACTIVE: 'inactive',
})

// Definir enum para tipos de documentos
const TypeDocumentEnum = Object.freeze({
  CNPJ: 'CNPJ',
})

const OrganizationModel = new Schema(
  {
    title: String,
    document: String,
    slug: String,
    typeDocument: {
      type: String,
      required: true,
      enum: Object.values(TypeDocumentEnum),
      default: TypeDocumentEnum.CNPJ, // Valor padrão é 'CNPJ'
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.ACTIVE, // Valor padrão é 'active'
    },
  },
  { timestamps: true },
)

export default mongoose.model('Organization', OrganizationModel)
