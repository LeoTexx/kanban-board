import { type Request, type Response } from 'express'
import { CustomError, InternalServerError } from '../shared/types/errors'
import { type CardService } from './CardService'

export class CardHandler {
  private readonly cardService: CardService

  constructor (cardService: CardService) {
    this.cardService = cardService
  }

  async getCards (req: Request, res: Response) {
    try {
      const cards = await this.cardService.listCards()
      res.json(cards)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  async createCard (req: Request, res: Response) {
    try {
      const card = await this.cardService.createCard(req.body)
      res.status(201).json(card)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  async updateCard (req: Request, res: Response) {
    const cardId = req.params.id
    try {
      const card = await this.cardService.updateCard(cardId, req.body)
      res.json(card)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  async deleteCard (req: Request, res: Response) {
    try {
      const cardId = req.params.id
      const cards = await this.cardService.deleteCard(cardId)
      res.json(cards)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  private handleError (res: Response, error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.status).send(error.message)
    } else if (error instanceof Error) {
      const internalError = new InternalServerError()
      res.status(internalError.status).send(internalError.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
}
