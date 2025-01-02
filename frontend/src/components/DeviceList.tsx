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

  // Filter devices based on the selected status
  const filteredDevices = devices.filter(
    (device) => filterStatus === "all" || device.status === filterStatus
  );

  // Column Definitions: Defines the columns to be displayed.
  const [columns] = useState<any[]>([
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    {
      headerName: "Location",
      valueGetter: (params: any) =>
        `${params.data.latitude}, ${params.data.longitude}`,
    },
  ]);

  return (
    <div className="h-full w-full">
      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <label className="p-2 justify-center">Filter by Status:</label>
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

      <AgGridReact
        rowData={filteredDevices}
        columnDefs={columns}
        onRowClicked={(row) => onDeviceSelect(row.data)}
        domLayout="autoHeight"
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 15, 20]}
      />
    </div>
  );
};

export default DeviceList;
