import * as fs from 'fs';
import * as path from 'path';
import { CreateMovieCase } from '../use-cases/create-movie.case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieSeed {
  constructor(readonly useCase: CreateMovieCase) {}

  async seedFromCSV(filePath: string): Promise<void> {
    try {
      const absolutePath = path.resolve(filePath);
      const data = fs.readFileSync(absolutePath, 'utf-8');
      const lines = data
        .split('\n')
        .filter((line) => line.trim() !== '' && !line.includes('year'));

      const promise = lines.map(async (line) => {
        const [year, title, studios, producers, winner] = line.split(';');

        return this.useCase.execute({
          year: parseInt(year, 10),
          title,
          studios,
          producers,
          winner: winner === 'yes',
        });
      });

      await Promise.all(promise);

      console.log('Movies successfully seeded from CSV.');
    } catch (error) {
      console.error('Error seeding movies from CSV:', error);
    }
  }
}
