export interface DatabaseSchema {
  create: (modelName: string, data: any) => Promise<any>
  update: (modelName: string, where: any, data: any) => Promise<any>
  delete: (modelName: string, where: any) => Promise<void>
  findMany: (modelName: string) => Promise<any[]>
  findUnique: (modelName: string, where: any) => Promise<any | null>
}
