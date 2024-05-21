import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/common/schemas/Project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}
  async create(userId: string, createProjectDto: CreateProjectDto) {
    return await this.projectModel.create({
      ...createProjectDto,
      user: userId,
    });
  }

  async findAll(userId: string) {
    return await this.projectModel.find({ user: userId });
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid project id');
    return await this.projectModel.findById(id);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid project id');
    return await this.projectModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }

  async remove(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid project id');
    return await this.projectModel.findByIdAndDelete(id);
  }

  async addIssue(projectId: string, issueId: string) {
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      { $addToSet: { issues: issueId } },
      { new: true },
    );
  }
  async removeIssue(projectId: string, issueId: string) {
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      { $pull: { issues: issueId } },
      { new: true },
    );
  }

  async addPerformance(projectId: string, performanceId: string) {
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      { $addToSet: { performanceRecords: performanceId } },
      { new: true },
    );
  }
}
