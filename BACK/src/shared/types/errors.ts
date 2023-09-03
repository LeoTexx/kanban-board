export class CustomError extends Error {
  timestamp: Date
  status: number

  constructor (message: string, status: number) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)

    Object.defineProperties(this, {
      message: { enumerable: true, writable: true },
      stack: { enumerable: true, writable: true }
    })

    /**
     * Ensure the name of this error is the same as the class name
     * @type {string}
     */
    this.name = this.constructor.name

    /**
     * Error datetime
     * @type {Date}
     */
    this.timestamp = new Date()

    /**
     * Error status code
     * @type {number}
     */
    this.status = status || 500
  }
}

export class InternalServerError extends CustomError {
  constructor (message: string = 'Internal Server Error') {
    super(message, 500)
  }
}
