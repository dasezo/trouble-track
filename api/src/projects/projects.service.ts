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
  create(userId: string, createProjectDto: CreateProjectDto) {
    return this.projectModel.create({ ...createProjectDto, user: userId });
  }

  findAll(userId: string) {
    return this.projectModel.find({ user: userId });
  }

  findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid project id');
    return this.projectModel.findById(id);
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid project id');
    return this.projectModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }

  remove(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid project id');
    return this.projectModel.findByIdAndDelete(id);
  }

  async addIssue(projectId: string, issueId: string) {
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      { $addToSet: { issues: issueId } },
      { new: true },
    );
  }
  async removeOwner(projectId: string, issueId: string) {
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      { $pull: { issues: issueId } },
      { new: true },
    );
  }
}
