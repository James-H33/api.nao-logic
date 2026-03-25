import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from 'src/repository/workspace.repository';
import { WorkspaceDto } from 'src/types/dto/workspace.dto';

@Injectable()
export class WorkSpacesService {
  constructor(private readonly workspaceRepo: WorkspaceRepository) {}
  /**
   * create(name: string)
   * getOne(id: string)
   */

  async getAll(): Promise<WorkspaceDto[]> {
    const results = await this.workspaceRepo.getAll();

    return results.map((result) => ({
      workspaceId: result.id,
      name: result.name,
    }));
  }
}
