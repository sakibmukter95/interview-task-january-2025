export interface Device {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    status: "active" | "inactive"; 
}