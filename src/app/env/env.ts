import { IsString, validateSync } from 'class-validator';

export class Env {
  @IsString()
  HOST: string;

  @IsString()
  NODE_ENV: string;

  @IsString()
  PORT: string;

  static validate(): Env {
    const env = Object.assign(new Env(), process.env);
    const errors = validateSync(env, { whitelist: true });
    if (errors.length > 0) {
      throw new Error(
        `Environment validation failed: ${JSON.stringify(errors)}`,
      );
    }
    return env;
  }
}
