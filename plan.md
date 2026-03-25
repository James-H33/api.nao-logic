
* Defined Models for Work Orders and Work Centers in a NoSQL database context.

```typescript
    export interface WorkOrderDocument {
        docId: string;
        docType: 'workOrder';
        data: {
            name: string;
            workCenterId: string; // References WorkCenterDocument.docId
            status: WorkOrderStatus;
            startDate: string | null; // ISO format (e.g., "2026-01-15")
            endDate: string | null; // ISO format
        };
    }
```

```typescript
    export interface WorkCenterDocument {
        docId: string;
        docType: 'workCenter';
        data: {
            name: string;
        };
    }
```

```typescript
    export interface UserDocument {
        docId: string;
        docType: 'user';
        data: {
            name: string;
            email: string;
        };
    }
```


# Work Orders

### GET - /work-orders
Response:
```json
[
    {
        docId: "wo1",
        docType: "workOrder",
        data: {
            name: "Work Order 1",
            workCenterId: "wc1",
            status: "pending",
            startDate: "2026-01-15",
            endDate: null
        }
    }
];
```

# Work Centers

### GET - /work-centers
Response:
```json
[
    {
        docId: "wc1",
        docType: "workCenter",
        data: {
            name: "Work Center 1"
        }
    }
];
```
# Views

### GET - /view/{id}
Response: 
```json
    {
        viewId: "123",
        name: "Work Order View",
        workOrderIds: ["wo1", "wo2"],
        workCenterIds: ["wc1", "wc2"]
    }
```