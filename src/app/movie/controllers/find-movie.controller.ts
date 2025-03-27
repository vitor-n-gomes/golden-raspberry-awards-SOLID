import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FindMovieCase } from "../use-cases/find-movie.case";
import { MovieItemResponseDto } from "../dtos/response/movie-item.res.dto";

@ApiTags("Movies")
@Controller("movies")
export class FindMovieController {
  constructor(private readonly useCase: FindMovieCase) {}

  @Get(":id")
  @ApiOperation({ summary: "Find a movie by ID" })
  @ApiResponse({
    status: 200,
    description: "Movie found.",
    type: MovieItemResponseDto,
  })
  @ApiResponse({ status: 404, description: "Movie not found." })
  async handle(@Param("id") id: number) {
    return await this.useCase.execute(id);
  }
}
