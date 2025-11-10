"use client";
import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Chip, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import { Project, ProjectStatus, BookingType, LeadType } from "../interfaces/data/interface";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// Custom cell components
const StatusCell = ({ value }: { value: ProjectStatus }) => {
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "open":
        return "success";
      case "close":
        return "default";
      case "reopen":
        return "warning";
      case "withdrawn":
        return "error";
      case "on_hold":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Chip
      label={value.replace(/_/g, " ").toUpperCase()}
      color={getStatusColor(value)}
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};

const BookingCategoryCell = ({ value }: { value: BookingType }) => {
  const getCategoryColor = (category: BookingType) => {
    switch (category) {
      case "wedding":
        return "#e91e63";
      case "pre_wedding":
        return "#9c27b0";
      case "post_wedding":
        return "#673ab7";
      case "anniversary":
        return "#3f51b5";
      case "birthday":
        return "#2196f3";
      case "corporate_shoot":
        return "#009688";
      case "baby_bump":
        return "#ff9800";
      case "rice_cereony":
        return "#795548";
      default:
        return "#607d8b";
    }
  };

  return (
    <Chip
      label={value.replace(/_/g, " ").toUpperCase()}
      size="small"
      sx={{
        backgroundColor: getCategoryColor(value),
        color: "white",
        fontWeight: 500,
      }}
    />
  );
};

const LeadSourceCell = ({ value }: { value: LeadType }) => {
  const getLeadIcon = (lead: LeadType) => {
    return lead.replace(/_/g, " ").toUpperCase();
  };

  return (
    <Chip
      label={getLeadIcon(value)}
      variant="outlined"
      size="small"
      color="primary"
    />
  );
};

const ContactCell = ({ phone, email }: { phone: string; email: string }) => {
  return (
    <Stack spacing={0.5}>
      <Box display="flex" alignItems="center" gap={0.5}>
        <PhoneIcon sx={{ fontSize: 14, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary">
          {phone}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={0.5}>
        <EmailIcon sx={{ fontSize: 14, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary" noWrap>
          {email}
        </Typography>
      </Box>
    </Stack>
  );
};

const DateCell = ({ value }: { value: Date }) => {
  const date = new Date(value);
  return (
    <Stack>
      <Typography variant="body2" fontWeight={500}>
        {date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
    </Stack>
  );
};

const TrackCountCell = ({ trackCount, lastTrackedAt }: { trackCount: number; lastTrackedAt: Date | null }) => {
  return (
    <Stack alignItems="center" justifyContent="center" height="100%">
      <Box display="flex" alignItems="center" gap={0.5}>
        <TrendingUpIcon sx={{ fontSize: 16, color: "primary.main" }} />
        <Typography variant="body2" fontWeight={600} color="primary">
          {trackCount}
        </Typography>
      </Box>
      {lastTrackedAt && (
        <Typography variant="caption" color="text.secondary">
          {new Date(lastTrackedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </Typography>
      )}
    </Stack>
  );
};

const ActionsCell = ({ projectId, onView, onEdit }: { projectId: string; onView?: (id: string) => void; onEdit?: (id: string) => void }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      {onView && (
        <Tooltip title="View Details">
          <IconButton size="small" color="primary" onClick={() => onView(projectId)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title="Edit Project">
          <IconButton size="small" color="secondary" onClick={() => onEdit(projectId)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

const NameCell = ({ name }: { name: string; projectId: string }) => {
  return (
    <Stack>
      <Typography variant="body2" fontWeight={600}>
        {name}
      </Typography>
    </Stack>
  );
};

interface ProjectsDataGridProps {
  projects: Project[];
  loading?: boolean;
  onViewProject?: (id: string) => void;
  onEditProject?: (id: string) => void;
}

const ProjectsDataGrid: React.FC<ProjectsDataGridProps> = ({
  projects,
  loading = false,
  onViewProject,
  onEditProject,
}) => {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Project Name",
      width: 300,
      renderCell: (params: GridRenderCellParams<Project>) => (
        <NameCell name={params.row.name} projectId={params.row.id} />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params: GridRenderCellParams<Project>) => (
        <StatusCell value={params.row.status} />
      ),
    },
    {
      field: "bookingCategory",
      headerName: "Booking Category",
      width: 180,
      renderCell: (params: GridRenderCellParams<Project>) => (
        <BookingCategoryCell value={params.row.bookingCategory} />
      ),
    },
    {
      field: "leadSource",
      headerName: "Lead Source",
      width: 140,
      renderCell: (params: GridRenderCellParams<Project>) => (
        <LeadSourceCell value={params.row.leadSource} />
      ),
    },
    {
      field: "contact",
      headerName: "Contact Info",
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Project>) => (
        <ContactCell phone={params.row.phone} email={params.row.email} />
      ),
    },
    {
      field: "dateOfBooking",
      headerName: "Booking Date",
      width: 150,
      renderCell: (params: GridRenderCellParams<Project>) => (
        <DateCell value={params.row.dateOfBooking} />
      ),
    },
    {
      field: "trackCount",
      headerName: "Track Count",
      width: 120,
      renderCell: (params: GridRenderCellParams<Project>) => (
        <TrackCountCell 
          trackCount={params.row.trackCount} 
          lastTrackedAt={params.row.lastTrackedAt}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Project>) => (
        <ActionsCell
          projectId={params.row.id}
          onView={onViewProject}
          onEdit={onEditProject}
        />
      ),
    },
  ];

  return (
    <Box sx={{ height: "calc(100vh - 150px)", width: "100%" }}>
      <DataGrid
        rows={projects || []}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
        rowHeight={80}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(25, 118, 210, 0.12)",
            fontWeight: 600,
            fontSize: "0.875rem",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "action.hover",
          },
        }}
      />
    </Box>
  );
};

export default ProjectsDataGrid;
