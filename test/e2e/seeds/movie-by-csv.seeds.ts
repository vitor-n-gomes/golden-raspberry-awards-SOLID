import { MovieInMemory } from '@/app/movie/repositories/in-memories/movie.in.memory';
import * as fs from 'fs';
import * as path from 'path';

export default class MovieByCsvSeed {
  static async handle(): Promise<void> {
    try {
      const absolutePath = path.resolve('test/e2e/seeds/files/movie-list.csv');
      const data = fs.readFileSync(absolutePath, 'utf-8');
      const lines = data
        .split('\n')
        .filter((line) => line.trim() !== '' && !line.includes('year'));

      const inMemory = new MovieInMemory();

      const promise = lines.map(async (line) => {
        const [year, title, studios, producers, winner] = line.split(';');

        return inMemory.createMovie({
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
