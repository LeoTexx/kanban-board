import { PrismaClient } from '@prisma/client'
import { type DatabaseSchema } from '../schemas/DatabaseSchema'

export class PrismaDatabase implements DatabaseSchema {
  private static instance: PrismaDatabase
  private readonly prisma: PrismaClient

  private constructor () {
    this.prisma = new PrismaClient()
  }

  public static getInstance (): PrismaDatabase {
    if (!PrismaDatabase.instance) {
      PrismaDatabase.instance = new PrismaDatabase()
    }
    return PrismaDatabase.instance
  }

  async create (modelName: string, data: any): Promise<any> {
    return await this.getModel(modelName).create({ data })
  }

  async update (modelName: string, where: any, data: any): Promise<any> {
    return await this.getModel(modelName).update({ where, data })
  }

  async delete (modelName: string, where: any): Promise<void> {
    await this.getModel(modelName).delete({ where })
  }

  async findMany (modelName: string): Promise<any[]> {
    return await this.getModel(modelName).findMany()
  }

  async findUnique (modelName: string, where: any): Promise<any | null> {
    return await this.getModel(modelName).findUnique({ where })
  }

  private getModel (modelName: string) {
    const model = (this.prisma as any)[modelName]
    if (!model) {
      throw new Error(`Unknown model: ${modelName}`)
    }
    return model
  }
}
