import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { GetCurrentUserId } from 'src/common/decorators';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getStats(@GetCurrentUserId() userId: string) {
    const totalProjects =
      await this.statisticsService.countTotalProjecs(userId);
    const totalErrors = await this.statisticsService.countTotalIssues(userId);

    const errorTrends = await this.statisticsService.countErrorTrends(userId);

    const errorsDistribution =
      await this.statisticsService.countErrorsByType(userId);
    const errorsBySeverity =
      await this.statisticsService.countErrorsBySeverity(userId);

    const averageResolutionTime =
      await this.statisticsService.countAverageResolutionTime(userId);
    return {
      totalProjects,
      totalErrors,
      errorTrends,
      errorsDistribution,
      errorsBySeverity,
      averageResolutionTime,
    };
  }

  @Get(':projectId')
  async getProjectStats(@Param('projectId') projectId: string) {
    if (!isValidObjectId(projectId))
      throw new BadRequestException('Invalid project Id');
    const totalRequests =
      await this.statisticsService.countProjectTotalRequests(projectId);
    const totalErrors =
      await this.statisticsService.countProjectTotalIssues(projectId);

    const errorTrends =
      await this.statisticsService.countProjectErrorTrends(projectId);

    const errorsDistribution =
      await this.statisticsService.countProjectErrorsByType(projectId);
    const errorsBySeverity =
      await this.statisticsService.countProjectErrorsBySeverity(projectId);

    const averageResolutionTime =
      await this.statisticsService.countProjectAverageResolutionTime(projectId);

    const averageResopnseTime =
      await this.statisticsService.countProjectAverageResponseTime(projectId);
    const averageLoadTime =
      await this.statisticsService.countProjectAverageLoadTime(projectId);

    const errorRate = (totalErrors / totalRequests) * 100;
    const performanceMetrics = {
      totalRequests,
      errorRate: isNaN(errorRate) ? '0%' : `${errorRate.toFixed(2)}%`,
      averageResopnseTime,
      averageLoadTime,
    };
    return {
      projectId,
      performanceMetrics,
      averageResolutionTime,
      totalErrors,
      errorTrends,
      errorsDistribution,
      errorsBySeverity,
    };
  }
}
