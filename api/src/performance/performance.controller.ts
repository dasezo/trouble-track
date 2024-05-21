import { Body, Controller, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { PerformanceService } from './performance.service';

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Public()
  @Post(':projectId')
  async create(
    @Param('projectId') projectId: string,
    @Body() createPerformanceDto: CreatePerformanceDto,
  ) {
    const { loadTime, responseTime } = await this.performanceService.create(
      projectId,
      createPerformanceDto,
    );
    return { loadTime, responseTime };
  }
}
