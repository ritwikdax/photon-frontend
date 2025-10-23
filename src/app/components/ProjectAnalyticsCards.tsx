"use client";
import { Box, Typography, Chip } from "@mui/material";
import { Assignment, EventNote, Update } from "@mui/icons-material";
import { useProjectDeliverables } from "../queries/useProjectDeliverables";
import useProjectUpdates from "../queries/useUpdates";
import useProjectEvents from "../queries/useEvents";
import { useProjectSelected } from "../hooks/useProjectSelected";
import TrackCount from "./TrackCount";
import moment from "moment";

interface AnalyticsCardProps {
  icon: React.ReactNode;
  title: string;
  total: number;
  breakdown: { label: string; count: number; color: string }[];
  isLoading?: boolean;
}

function AnalyticsCard({
  icon,
  title,
  total,
  breakdown,
  isLoading,
}: AnalyticsCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 1,
        border: 1,
        borderColor: "divider",
        p: 2,
      }}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 2,
              color: "primary.main",
              mr: 2,
            }}>
            {icon}
          </Box>
          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {isLoading ? "..." : total}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
          {breakdown.map((item, index) => (
            <Chip
              key={index}
              label={`${item.label}: ${item.count}`}
              size="small"
              sx={{
                bgcolor: item.color,
                color: "white",
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

interface ProjectAnalyticsCardsProps {
  projectId: string;
}

export default function ProjectAnalyticsCards({
  projectId,
}: ProjectAnalyticsCardsProps) {
  const projectDeliverables = useProjectDeliverables(projectId);
  const { selectedProject } = useProjectSelected();
  const { data: updates, isLoading: updatesLoading } =
    useProjectUpdates(projectId);
  const { data: events, isLoading: eventsLoading } =
    useProjectEvents(projectId);

  // Calculate deliverables breakdown
  const deliverablesTotal = projectDeliverables?.length || 0;
  const deliverablesDelivered =
    projectDeliverables?.filter((d) => d.isDelivered).length || 0;
  const deliverablesPending = deliverablesTotal - deliverablesDelivered;

  const deliverablesBreakdown = [
    { label: "Delivered", count: deliverablesDelivered, color: "#4caf50" },
    { label: "Pending", count: deliverablesPending, color: "#ff9800" },
  ];

  // Calculate updates breakdown
  const updatesTotal = updates?.length || 0;
  const updatesSuccess =
    updates?.filter((u: any) => u.type === "success").length || 0;
  const updatesInfo =
    updates?.filter((u: any) => u.type === "info").length || 0;
  const updatesError =
    updates?.filter((u: any) => u.type === "error" || u.type === "failed")
      .length || 0;
  const updatesBlocker =
    updates?.filter((u: any) => u.type === "blocker").length || 0;

  const updatesBreakdown = [
    { label: "Success", count: updatesSuccess, color: "#4caf50" },
    { label: "Info", count: updatesInfo, color: "#2196f3" },
    { label: "Error", count: updatesError, color: "#f44336" },
    { label: "Blocker", count: updatesBlocker, color: "#9c27b0" },
  ].filter((item) => item.count > 0);

  // Calculate events breakdown
  const eventsTotal = events?.length || 0;
  const eventsDone =
    events?.filter((e: any) => e.status === "done").length || 0;
  const eventsUpcoming =
    events?.filter((e: any) => e.status === "upcoming").length || 0;
  const eventsInProgress =
    events?.filter((e: any) => e.status === "in_progress").length || 0;
  const eventsCancelled =
    events?.filter(
      (e: any) => e.status === "cancelled" || e.status === "postponed"
    ).length || 0;

  const eventsBreakdown = [
    { label: "Done", count: eventsDone, color: "#4caf50" },
    { label: "In Progress", count: eventsInProgress, color: "#2196f3" },
    { label: "Upcoming", count: eventsUpcoming, color: "#ff9800" },
    { label: "Cancelled", count: eventsCancelled, color: "#f44336" },
  ].filter((item) => item.count > 0);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2,
        mb: 3,
      }}>
      <AnalyticsCard
        icon={<Assignment />}
        title="Deliverables"
        total={deliverablesTotal}
        breakdown={deliverablesBreakdown}
        isLoading={!projectDeliverables}
      />
      <AnalyticsCard
        icon={<Update />}
        title="Updates"
        total={updatesTotal}
        breakdown={updatesBreakdown}
        isLoading={updatesLoading}
      />
      <AnalyticsCard
        icon={<EventNote />}
        title="Events"
        total={eventsTotal}
        breakdown={eventsBreakdown}
        isLoading={eventsLoading}
      />
      <TrackCount
        icon={<EventNote />}
        title="Tracker Click"
        total={selectedProject?.trackCount || 0}
        lastTracked={
          selectedProject?.lastTrackedAt
            ? moment(selectedProject?.lastTrackedAt).fromNow()
            : "No data found"
        }
      />
    </Box>
  );
}
