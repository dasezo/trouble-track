import { Controller, Get } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getStats(@GetCurrentUserId() userId: string) {
    const totalErrors =
      await this.statisticsService.getTotlaErrorsForUser(userId);

    return {
      totalErrors,
    };
  }
}
