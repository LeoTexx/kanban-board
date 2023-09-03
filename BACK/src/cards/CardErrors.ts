import { CustomError } from '../shared/types/errors'

export class InvalidCardDataError extends CustomError {
  constructor () {
    super('Invalid card data', 400)
  }
}

export class CardCreationError extends CustomError {
  constructor () {
    super('Error creating the card', 500)
  }
}

export class CardNotFoundError extends CustomError {
  constructor () {
    super('Card not found', 404)
  }
}

export class CardUpdateError extends CustomError {
  constructor () {
    super('Error updating the card', 500)
  }
}

export class FailedToRetrieveCardsError extends CustomError {
  constructor () {
    super('Failed to retrieve cards', 500)
  }
}
