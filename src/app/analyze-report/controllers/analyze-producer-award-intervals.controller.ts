import { Controller, Get } from '@nestjs/common';
import { AnalyzeProducerAwardIntervalsUseCase } from '../use-cases/analyze-producer-award-intervals.case';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('analyze-producer-award-intervals')
export class AnalyzeProducerAwardIntervalsController {
  constructor(private readonly useCase: AnalyzeProducerAwardIntervalsUseCase) {}

  @Get('')
  @ApiOperation({ summary: 'Find a movie by ID' })
  @ApiResponse({ status: 200, description: 'Movie found.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async handle() {
    return await this.useCase.execute();
  }
}
