import { type Request, type Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import { CustomError } from '../types/errors'
import { config } from '../config'

export class AuthRouter {
  private readonly router: Router

  constructor () {
    this.router = Router()
    this.initializeRoutes()
  }

  public getRouter (): Router {
    return this.router
  }

  private async login (req: Request, res: Response): Promise<void> {
    const { login, senha } = req.body

    const expectedLogin = config.authUsername
    const expectedPassword = config.authPassword

    if (login === expectedLogin && senha === expectedPassword) {
      const token = jwt.sign({ sub: login }, config.jwtSecret, {
        expiresIn: '1h'
      })
      res.json({ token })
    } else {
      throw new InvalidLoginCredentialsError()
    }
  }

  private initializeRoutes (): void {
    this.router.post('/login', this.login.bind(this))
  }
}

class InvalidLoginCredentialsError extends CustomError {
  constructor () {
    super('Invalid Login or Password', 401)
  }
}

export default new AuthRouter().getRouter()
