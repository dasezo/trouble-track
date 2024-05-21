import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import {
  Performance,
  PerformanceDocument,
} from 'src/common/schemas/Performance.schema';
import { ProjectsService } from 'src/projects/projects.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectModel(Performance.name)
    private performanceModel: Model<PerformanceDocument>,
    private projectService: ProjectsService,
  ) {}
  async create(
    projectId: string,
    createPerformanceDto: CreatePerformanceDto,
  ): Promise<Performance> {
    if (!isValidObjectId(projectId))
      throw new BadRequestException('Invalid project id');

    const project = await this.projectService.findOne(projectId);

    if (!project) throw new NotFoundException('Project not found');

    const record = await this.performanceModel.create({
      ...createPerformanceDto,
      project: projectId,
    });

    await this.projectService.addPerformance(projectId, String(record._id));

    return record;
  }

  async findAll(projectId: string) {
    const records = await this.performanceModel.find({ project: projectId });
    if (records.length < 1)
      throw new NotFoundException(
        'Performance records not found for this project',
      );

    return records;
  }

  async findOne(id: string) {
    return await this.performanceModel.findById(id);
  }
}
