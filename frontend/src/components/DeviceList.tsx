import React, { useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Device } from "../types/device";
ModuleRegistry.registerModules([AllCommunityModule]);

interface DeviceListProps {
  devices: Device[]; // Array of devices passed as props
  onDeviceSelect: (device: Device) => void; // Callback for selecting a device
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, onDeviceSelect }) => {
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

  // Filter devices based on the selected status
  const filteredDevices = devices.filter(
    (device) => filterStatus === "all" || device.status === filterStatus
  );

  // Column Definitions: Defines the columns to be displayed.
  const [columns] = useState<any[]>([
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    {
      headerName: "Location (latitude, longitude)",
      flex: 1.5,
      valueGetter: (params: any) =>
        `${params.data.latitude}, ${params.data.longitude}`,
    },
  ]);

  // Row Class Rules for Conditional Styling
  const rowClassRules = {
    "bg-gray-200": (params: any) => params.data.id === selectedDeviceId,
  };

  // Handle Row Click
  const handleRowClick = (row: any) => {
    if (row.data.id === selectedDeviceId) {
      // Reset selection if the same row is clicked again
      setSelectedDeviceId(null);
      onDeviceSelect(null);
    } else {
      setSelectedDeviceId(row.data.id);
      onDeviceSelect(row.data);
    }
  };

  return (
    <div className="h-3/4 w-full">
      {/* Filter Dropdown */}
      <div className="flex items-center justify-between mb-4">
        <label className="p-2 bg-green-100 text-teal-700">
          List of {filterStatus} Devices
        </label>
        <div className="flex items-center space-x-2">
          <label className="p-2">Filter by Status:</label>
          <select
            className="p-2 border rounded"
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as "all" | "active" | "inactive")
            }
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <AgGridReact
        rowData={filteredDevices}
        columnDefs={columns}
        rowClassRules={rowClassRules} // Apply conditional styling
        onRowClicked={handleRowClick} // Handle row clicks
        domLayout="normal"
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 15, 20]}
      />
    </div>
  );
};

export default DeviceList;
