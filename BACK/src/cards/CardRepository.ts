import { type Card } from '@prisma/client'
import { type DatabaseSchema } from '../shared/schemas/DatabaseSchema'

export class CardRepository {
  private readonly database: DatabaseSchema
  private readonly modelName: string = 'card'

  constructor (database: DatabaseSchema) {
    this.database = database
  }

  async create (data: {
    titulo: string
    conteudo: string
    lista: string
  }): Promise<Card> {
    return await this.database.create(this.modelName, data)
  }

  async update (
    id: string,
    data: { titulo: string, conteudo: string, lista: string }
  ): Promise<Card> {
    return await this.database.update(this.modelName, { id }, data)
  }

  async delete (id: string): Promise<void> {
    await this.database.delete(this.modelName, { id })
  }

  async findMany (): Promise<Card[]> {
    return await this.database.findMany(this.modelName)
  }

  async findUnique (id: string): Promise<Card | null> {
    return await this.database.findUnique(this.modelName, { id })
  }
}
