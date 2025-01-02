import { useState, useEffect } from "react";
import axios from "axios";
import { Device } from "../model/Device";

const API_URL = "http://localhost:8000/api/devices";

interface ApiResponse {
  success: boolean;
  data: Device[];
}

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get<ApiResponse>(API_URL);
        setDevices(response.data.data); 
      } catch (err) {
        setError("Failed to fetch devices");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return { devices, loading, error };
};
