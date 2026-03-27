import { Injectable } from '@nestjs/common';
import { WorkCenterRepository } from 'src/repository/work-center.repository';
import { WorkCenterDocumentDto } from 'src/types/dto/work-center-document.dto';
import { WorkCenter } from 'src/types/model/work-center.model';

@Injectable()
export class WorkCentersService {
  constructor(private readonly workCenterRepository: WorkCenterRepository) {}

  async getAll(): Promise<WorkCenterDocumentDto[]> {
    const results = await this.workCenterRepository.getAll();

    return results.map((result) => this.toDto(result));
  }

  async getAllByWorkspace(
    workspaceId: string,
  ): Promise<WorkCenterDocumentDto[]> {
    const results =
      await this.workCenterRepository.getByWorkspaceId(workspaceId);

    return results.map((result) => this.toDto(result));
  }

  async getBulk(body: {
    ids: string[];
    workspaceId: string;
  }): Promise<WorkCenterDocumentDto[]> {
    const allWorkCenters = await this.workCenterRepository.getAll();
    const workCentersMap = new Map<string, WorkCenter>();

    for (const workCenter of allWorkCenters) {
      workCentersMap.set(workCenter.id, workCenter);
    }

    const results: WorkCenterDocumentDto[] = [];

    for (const id of body.ids) {
      const workCenter = workCentersMap.get(id);

      if (workCenter && workCenter.workspace_id === body.workspaceId) {
        results.push(this.toDto(workCenter));
      }
    }

    return results;
  }

  async create(workCenter: {
    name: string;
    workspaceId: string;
  }): Promise<WorkCenterDocumentDto> {
    const id = crypto.randomUUID();

    // Would we add some logic here to check if the workspace exists before creating the work center?

    await this.workCenterRepository.create({
      id,
      name: workCenter.name,
      workspace_id: workCenter.workspaceId,
    });

    return this.toDto({
      id,
      name: workCenter.name,
      workspace_id: workCenter.workspaceId,
    });
  }

  async delete(id: string): Promise<void> {
    // Do we want to check if the work center exists before trying to delete it?

    await this.workCenterRepository.delete(id);
  }

  private toDto(result: WorkCenter): WorkCenterDocumentDto {
    return {
      docId: result.id,
      docType: 'workCenter',
      data: {
        name: result.name,
      },
    };
  }
}
