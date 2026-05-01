export interface AuthenticatedDto {
  authToken: string;
  workspaceId: string | null;
}
