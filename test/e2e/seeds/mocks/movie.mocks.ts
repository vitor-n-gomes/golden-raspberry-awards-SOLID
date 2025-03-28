import { Movie } from "src/app/movie/models/movie.model";

export const mockMoviesOnlyWinners: Movie[] = [
  {
    id: 1,
    year: 2000,
    title: "The Worst Movie Ever",
    studios: "Bad Studios",
    winner: true,
  },
  {
    id: 2,
    year: 20005,
    title: "Another Bad Movie",
    studios: "Terrible Productions",
    winner: true,
  },
  {
    id: 3,
    year: 2010,
    title: "Yet Another Awful Film",
    studios: "Awful Films Inc.",
    winner: true,
  },
  {
    id: 4,
    year: 2020,
    title: "Yet Another Awful Film",
    studios: "Awful Films Inc.",
    winner: true,
  },
];

export const mockMoviesWithOneItem: Movie[] = [
  {
    id: 1,
    year: 2000,
    title: "The Worst Movie Ever",
    studios: "Bad Studios",
    winner: true,
  },
];
