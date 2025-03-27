import { Controller, Get } from "@nestjs/common";
import { AnalyzeProducerAwardIntervalsUseCase } from "../use-cases/analyze-producer-award-intervals.case";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProducerIntervalsResultResponseDto } from "../dtos/response/producer-intervals-result.res.dto";

@Controller("analyze-producer-award-intervals")
export class AnalyzeProducerAwardIntervalsController {
  constructor(private readonly useCase: AnalyzeProducerAwardIntervalsUseCase) {}

  @Get("")
  @ApiOperation({ summary: "Analyze producer awards intervals" })
  @ApiResponse({
    status: 200,
    description: "Producer intervals result.",
    type: ProducerIntervalsResultResponseDto,
  })
  @ApiResponse({ status: 404, description: "Movies not found." })
  async handle(): Promise<ProducerIntervalsResultResponseDto> {
    return await this.useCase.execute();
  }
}
