import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ListMovieCase } from "../use-cases/list-movie.case";

@ApiTags("Movies")
@Controller("movies")
export class ListMovieController {
  constructor(private readonly useCase: ListMovieCase) {}

  @Get()
  @ApiOperation({ summary: "List all movies" })
  @ApiResponse({ status: 200, description: "Movies retrieved successfully." })
  async handle() {
    return await this.useCase.execute();
  }
}
