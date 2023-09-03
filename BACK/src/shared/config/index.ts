import dotenv from 'dotenv'
import Joi from 'joi'
import { CustomError } from '../types/errors'

class ConfigModule {
  private readonly envConfig: Record<string, string>

  constructor () {
    const result = dotenv.config()

    if (result.error) {
      throw new ModuleNotLoadedError()
    }

    this.envConfig = this.validateInput(result.parsed!)
  }

  private validateInput (
    envConfig: Record<string, string>
  ): Record<string, string> {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      DATABASE_URL: Joi.string().uri().required(),
      AUTH_USERNAME: Joi.string().required(),
      AUTH_PASSWORD: Joi.string().required(),
      JWT_SECRET: Joi.string().required()
    })

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig)

    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }

    return validatedEnvConfig
  }

  get databaseUrl (): string {
    return this.envConfig.DATABASE_URL
  }

  get authUsername (): string {
    return this.envConfig.AUTH_USERNAME
  }

  get authPassword (): string {
    return this.envConfig.AUTH_PASSWORD
  }

  get jwtSecret (): string {
    return this.envConfig.JWT_SECRET
  }
}

export const config = new ConfigModule()

class ModuleNotLoadedError extends CustomError {
  constructor () {
    super('Could not load configurations', 500)
  }
}
