import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { SearchEntityDto } from 'src/common/dto/search-entity.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectDto } from './dto/get-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  search(searchProjectDto: SearchEntityDto): Promise<Project[]> {
    const filters: FilterQuery<ProjectDocument> = {};

    if (searchProjectDto.query) {
      filters.$text = { $search: searchProjectDto.query }
    }
    return this.projectModel.find(filters).exec();
  }

  findOne(getProjectDto: GetProjectDto): Promise<Project> {
    return this.projectModel.findById(getProjectDto.id).exec();
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: string) {
    return this.projectModel.deleteOne({ id });
  }
}
