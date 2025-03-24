import { IsString, validateSync } from 'class-validator';

export class Env {
  @IsString()
  HOST: string;

  @IsString()
  NODE_ENV: string;

  @IsString()
  PORT: string;

  static validate(config: Record<string, any>): Env {
    const env = Object.assign(new Env(), config);
    const errors = validateSync(env, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
      throw new Error(`Environment validation failed: ${errors}`);
    }
    return env;
  }
}
