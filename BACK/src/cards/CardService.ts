import {
  CardCreationError,
  CardNotFoundError,
  CardUpdateError,
  FailedToRetrieveCardsError,
  InvalidCardDataError
} from './CardErrors'
import { type CardRepository } from './CardRepository'
import { type CardSchema } from './CardSchema'

export class CardService {
  private readonly cardRepository: CardRepository

  constructor (cardRepository: CardRepository) {
    this.cardRepository = cardRepository
  }

  async createCard (data: {
    titulo: string
    conteudo: string
    lista: string
    id?: string
  }): Promise<CardSchema> {
    if (!data.titulo || !data.conteudo || !data.lista || data.id) {
      throw new InvalidCardDataError()
    }
    try {
      return await this.cardRepository.create(data)
    } catch (error) {
      throw new CardCreationError()
    }
  }

  async updateCard (
    cardId: string,
    data: { id: string, titulo: string, conteudo: string, lista: string }
  ): Promise<CardSchema> {
    if (data.id !== cardId || !data.titulo || !data.conteudo || !data.lista) {
      throw new InvalidCardDataError()
    }
    const existingCard = await this.cardRepository.findUnique(cardId)
    if (!existingCard) {
      throw new CardNotFoundError()
    }
    try {
      return await this.cardRepository.update(cardId, data)
    } catch (error) {
      throw new CardUpdateError()
    }
  }

  async deleteCard (cardId: string): Promise<CardSchema[]> {
    const existingCard = await this.cardRepository.findUnique(cardId)
    if (!existingCard) {
      throw new CardNotFoundError()
    }

    try {
      await this.cardRepository.delete(cardId)
      return await this.cardRepository.findMany()
    } catch (error) {
      throw new FailedToRetrieveCardsError()
    }
  }

  async listCards (): Promise<CardSchema[]> {
    try {
      return await this.cardRepository.findMany()
    } catch (error) {
      throw new FailedToRetrieveCardsError()
    }
  }
}
