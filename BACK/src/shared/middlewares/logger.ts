import { type Request, type Response, type NextFunction } from 'express'

export class LoggerMiddleware {
  public static logChanges (req: Request, res: Response, next: NextFunction) {
    if (req.method === 'PUT' || req.method === 'DELETE') {
      const cardId = req.params.id
      const titulo = req.body.titulo
      const action = req.method === 'PUT' ? 'Alterado' : 'Removido'
      const datetime = LoggerMiddleware.getFormattedDateTime()

      console.log(`> ${datetime} - Card ${cardId} - ${titulo} - ${action}`)
    }
    next()
  }

  private static getFormattedDateTime (): string {
    const current = new Date()
    const date = current.toLocaleDateString('pt-BR')
    const time = current.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    return `${date} ${time}`
  }
}
