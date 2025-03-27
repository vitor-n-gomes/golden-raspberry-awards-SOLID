import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateMovieCase } from "../use-cases/create-movie.case";
import { CreateMovieReqDto } from "../dtos/requests/create-movie.req.dto";
import { MovieItemResponseDto } from "../dtos/response/movie-item.res.dto";

@ApiTags("Movies")
@Controller("movies")
export class CreateMovieController {
  constructor(private readonly useCase: CreateMovieCase) {}

  @Post()
  @ApiOperation({ summary: "Create a new movie" })
  @ApiResponse({
    status: 201,
    description: "Movie created successfully.",
    type: MovieItemResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input." })
  async create(@Body() createMovieDto: CreateMovieReqDto) {
    return await this.useCase.execute(createMovieDto);
  }
}
