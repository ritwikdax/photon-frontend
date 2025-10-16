"use client";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, Alert, Chip } from "@mui/material";
import useEmployees from "../queries/useEmployees";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "alternatePhone",
    headerName: "Alternate Phone",
    width: 150,
  },
  {
    field: "expertise",
    headerName: "Expertise",
    width: 300,
    flex: 1,
    filterable: true,
    sortable: false,
    renderCell: (params: any) => {
      const skills = params.row.expertise;
      if (!Array.isArray(skills)) return null;
      return (
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", py: 1 }}>
          {skills.map((skill: string, index: number) => (
            <Chip key={index} label={skill} size="small" />
          ))}
        </Box>
      );
    },
    valueGetter: (value: any, row: any) => {
      return Array.isArray(value) ? value.join(", ") : "";
    },
  },
  {
    field: "doj",
    headerName: "Date of Joining",
    width: 150,
    type: "date",
    valueGetter: (value: any, row: any) => {
      return value ? new Date(value) : null;
    },
    valueFormatter: (value: any) => {
      if (!value) return "";
      return new Date(value).toLocaleDateString();
    },
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 100,
    type: "number",
  },
  {
    field: "address",
    headerName: "Address",
    width: 250,
    flex: 1,
  },
];

export default function EmployeesPage() {
  const { data: employees, isLoading, error } = useEmployees();

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading employees: {(error as Error).message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ height: "calc(100vh - 200px)", width: "100%", mt: 2 }}>
        <DataGrid
          rows={employees || []}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
            sorting: {
              sortModel: [{ field: "name", sort: "asc" }],
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          getRowHeight={() => 'auto'}
          sx={{
            "& .MuiDataGrid-cell": {
              py: 2,
            },
            "& .MuiDataGrid-row": {
              maxHeight: "none !important",
            },
          }}
          disableRowSelectionOnClick
          filterMode="client"
        />
      </Box>
    </Box>
  );
}
