"use client";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, Alert, Chip, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useClients from "../queries/useClients";
import { useDialog } from "../context/DialogContext";
import EditClientForm from "../components/forms/EditClientForm";
import useUpdateMutationById from "../mutations/useUpdateMutationById";

export default function ClientsPage() {
  const { data: clients, isLoading, error } = useClients();
  const { openDialog, closeDialog } = useDialog();
  const updateMutation = useUpdateMutationById("clients", () => {
    closeDialog();
  });

  const handleEdit = (client: any) => {
    openDialog(
      <EditClientForm
        client={client}
        onSubmit={(data) => updateMutation.mutate(data)}
        onCancel={closeDialog}
        isLoading={updateMutation.isPending}
      />,
      { maxWidth: "md", fullWidth: true }
    );
  };

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
      field: "address",
      headerName: "Address",
      width: 250,
      flex: 1,
    },
    {
      field: "isPremiumClient",
      headerName: "Premium Client",
      width: 150,
      type: "boolean",
      renderCell: (params: any) => {
        return params.value ? (
          <Chip label="Premium" color="primary" size="small" />
        ) : (
          <Chip label="Regular" variant="outlined" size="small" />
        );
      },
    },
    {
      field: "additionalDetails",
      headerName: "Additional Details",
      width: 250,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <Tooltip title="Edit Client">
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading clients: {(error as Error).message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ height: "calc(100vh - 200px)", width: "100%", mt: 2 }}>
        <DataGrid
          rows={clients || []}
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
