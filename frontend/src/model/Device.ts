// Enum for device status
export enum DeviceStatus {
  Active = "active",
  Inactive = "inactive",
}

export interface Device {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: DeviceStatus;
}
