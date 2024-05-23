import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Issue, IssueDocument } from 'src/common/schemas/Issue.schema';
import {
  Performance,
  PerformanceDocument,
} from 'src/common/schemas/Performance.schema';
import { Project, ProjectDocument } from 'src/common/schemas/Project.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Performance.name)
    private performanceModel: Model<PerformanceDocument>,
    @InjectModel(Issue.name) private issueModel: Model<IssueDocument>,
  ) {}

  async countTotalIssues(userId: string) {
    const projects = await this.projectModel
      .find({ user: userId })
      .select('_id');
    const projectIds = projects.map((project) => project._id);
    return this.issueModel.countDocuments({ project: { $in: projectIds } });
  }

  async countTotalProjecs(userId: string) {
    return await this.projectModel.countDocuments({ user: userId });
  }

  async countErrorTrends(userId: string) {
    const projects = await this.projectModel
      .find({ user: userId })
      .select('_id');
    const projectIds = projects.map((project) => project._id);

    return await this.issueModel.aggregate([
      {
        $match: {
          project: { $in: projectIds },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$occurredAt' },
            month: { $month: '$occurredAt' },
            day: { $dayOfMonth: '$occurredAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              {
                $cond: {
                  if: { $lt: ['$_id.month', 10] },
                  then: { $concat: ['0', { $toString: '$_id.month' }] },
                  else: { $toString: '$_id.month' },
                },
              },
              '-',
              {
                $cond: {
                  if: { $lt: ['$_id.day', 10] },
                  then: { $concat: ['0', { $toString: '$_id.day' }] },
                  else: { $toString: '$_id.day' },
                },
              },
            ],
          },
          count: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);
  }

  async countErrorsBySeverity(userId: string) {
    const projects = await this.projectModel
      .find({ user: userId })
      .select('_id');
    const projectIds = projects.map((project) => project._id);

    return await this.issueModel.aggregate([
      {
        $match: {
          project: { $in: projectIds },
        },
      },
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          severity: '$_id',
          count: 1,
        },
      },
    ]);
  }

  async countErrorsByType(userId: string) {
    const projects = await this.projectModel
      .find({ user: userId })
      .select('_id');
    const projectIds = projects.map((project) => project._id);

    return await this.issueModel.aggregate([
      {
        $match: {
          project: { $in: projectIds },
        },
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          errorType: '$_id',
          count: 1,
        },
      },
    ]);
  }

  async countAverageResolutionTime(userId: string) {
    const projects = await this.projectModel
      .find({ user: userId })
      .select('_id');
    const projectIds = projects.map((project) => project._id);
    const result = await this.issueModel
      .aggregate([
        {
          $match: {
            resolvedAt: { $exists: true },
            project: { $in: projectIds },
          },
        },
        {
          $group: {
            _id: null,
            totalResolutionTime: {
              $sum: { $subtract: ['$resolvedAt', '$occurredAt'] },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            averageResolutionTime: {
              $divide: ['$totalResolutionTime', '$count'],
            },
          },
        },
      ])
      .exec();
    if (result.length > 0) {
      const averageResolutionTimeHours =
        result[0].averageResolutionTime / (1000 * 60 * 60);
      return `${averageResolutionTimeHours.toFixed(2)} hours`;
    } else {
      return '0 hours';
    }
  }

  async countProjectTotalIssues(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project Not Found');
    return this.issueModel.countDocuments({ project: projectId });
  }
  async countProjectTotalRequests(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project Not Found');
    return this.performanceModel.countDocuments({ project: projectId });
  }
  async countProjectErrorTrends(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project Not Found');
    return await this.issueModel.aggregate([
      {
        $match: {
          project: new Types.ObjectId(projectId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$occurredAt' },
            month: { $month: '$occurredAt' },
            day: { $dayOfMonth: '$occurredAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              {
                $cond: {
                  if: { $lt: ['$_id.month', 10] },
                  then: { $concat: ['0', { $toString: '$_id.month' }] },
                  else: { $toString: '$_id.month' },
                },
              },
              '-',
              {
                $cond: {
                  if: { $lt: ['$_id.day', 10] },
                  then: { $concat: ['0', { $toString: '$_id.day' }] },
                  else: { $toString: '$_id.day' },
                },
              },
            ],
          },
          count: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);
  }

  async countProjectErrorsBySeverity(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project Not Found');
    return await this.issueModel.aggregate([
      {
        $match: {
          project: new Types.ObjectId(projectId),
        },
      },
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          severity: '$_id',
          count: 1,
        },
      },
    ]);
  }

  async countProjectErrorsByType(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project Not Found');
    return await this.issueModel.aggregate([
      {
        $match: {
          project: new Types.ObjectId(projectId),
        },
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          errorType: '$_id',
          count: 1,
        },
      },
    ]);
  }

  async countProjectAverageResolutionTime(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project Not Found');
    const result = await this.issueModel
      .aggregate([
        {
          $match: {
            resolvedAt: { $exists: true },
            project: new Types.ObjectId(projectId),
          },
        },
        {
          $group: {
            _id: null,
            totalResolutionTime: {
              $sum: { $subtract: ['$resolvedAt', '$occurredAt'] },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            averageResolutionTime: {
              $divide: ['$totalResolutionTime', '$count'],
            },
          },
        },
      ])
      .exec();
    if (result.length > 0) {
      const averageResolutionTimeHours =
        result[0].averageResolutionTime / (1000 * 60 * 60);
      return `${averageResolutionTimeHours.toFixed(2)} hours`;
    } else {
      return '0 hours';
    }
  }

  async countProjectAverageResponseTime(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project Not Found');

    const result = await this.performanceModel
      .aggregate([
        {
          $match: {
            project: new Types.ObjectId(projectId),
          },
        },
        {
          $group: {
            _id: null, // Keep the _id for grouping
            totalResponseTime: { $sum: '$responseTime' },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            averageResponseTime: { $divide: ['$totalResponseTime', '$count'] },
          },
        },
      ])
      .exec();
    if (result.length > 0) {
      return `${result[0].averageResponseTime.toFixed(2)} ms`;
    } else {
      return '0 ms';
    }
  }

  async countProjectAverageLoadTime(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project Not Found');

    const result = await this.performanceModel
      .aggregate([
        {
          $match: {
            project: new Types.ObjectId(projectId),
          },
        },
        {
          $group: {
            _id: null, // Keep the _id for grouping
            totalLoadTime: { $sum: '$loadTime' },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            averageLoadTime: { $divide: ['$totalLoadTime', '$count'] },
          },
        },
      ])
      .exec();
    if (result.length > 0) {
      return `${result[0].averageLoadTime.toFixed(2)} ms`;
    } else {
      return '0 ms';
    }
  }
}
