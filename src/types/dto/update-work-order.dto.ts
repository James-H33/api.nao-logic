export interface UpdateWorkOrderDto {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  workspaceId: string;
  workCenterId: string;
}
