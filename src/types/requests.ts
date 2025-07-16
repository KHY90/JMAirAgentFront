export interface InstallRequest {
  installId: number;
  requestDate: string;
  installStatus: string;
}

export interface ServiceRequest {
  asId: number;
  asStartTime: string;
  asStatus: string;
}

export interface CleanRequest {
  cleanId: number;
  requestDate?: string;
  cleanStartTime?: string;
  cleanStatus: string;
}
