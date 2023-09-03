import { Router } from 'express'
import { LoggerMiddleware } from '../shared/middlewares/logger'
import { type CardHandler } from '../cards/CardHandler'

export class CardRouter {
  private readonly router: Router

  constructor (private readonly cardHandler: CardHandler) {
    this.router = Router()
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router
      .route('/cards/')
      .get(this.cardHandler.getCards.bind(this.cardHandler))
      .post(this.cardHandler.createCard.bind(this.cardHandler))

    this.router
      .route('/cards/:id')
      .put(
        LoggerMiddleware.logChanges,
        this.cardHandler.updateCard.bind(this.cardHandler)
      )
      .delete(
        LoggerMiddleware.logChanges,
        this.cardHandler.deleteCard.bind(this.cardHandler)
      )
  }

  public getRouter (): Router {
    return this.router
  }
}
