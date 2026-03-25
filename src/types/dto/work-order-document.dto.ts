import { WorkOrderStatus } from '../work-order-status';

export interface WorkOrderDocumentDto {
  docId: string;
  docType: 'workOrder';
  data: {
    name: string;
    description: string;
    workCenterId: string;
    status: WorkOrderStatus;
    startDate: string | null;
    endDate: string | null;
  };
}
