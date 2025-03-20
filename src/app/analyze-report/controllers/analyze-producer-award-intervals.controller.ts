import { Controller, Get } from '@nestjs/common';
import { AnalyzeProducerAwardIntervalsUseCase } from '../use-cases/analyze-producer-award-intervals.case';

@Controller('analyze-producer-award-intervals')
export class AnalyzeProducerAwardIntervalsController {
  constructor(private readonly useCase: AnalyzeProducerAwardIntervalsUseCase) {}

  @Get()
  async handle() {
    return await this.useCase.execute();
  }
}
