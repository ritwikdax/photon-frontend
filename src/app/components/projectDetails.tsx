import React from "react";

// Remove MUI Tabs imports, import ProjectTabsCard instead
import ProjectTabsCard from "./projectTabsCard";

interface ProjectDetailsProps {
  name: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  bookingCategory?: string;
  dateOfBooking?: string;
  leadSource?: string;
  discussionSummary?: string;
  details?: string;
  status?: "open" | "close";
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  name,
  phone,
  alternatePhone,
  email,
  bookingCategory,
  dateOfBooking,
  leadSource,
  discussionSummary,
  details,
  status,
}) => {
  const statusColor =
    status === "open" ? "#22c55e" : status === "close" ? "#ef4444" : "#d1d5db";
  const statusText =
    status === "open" ? "Open" : status === "close" ? "Closed" : "Unknown";
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "1.5rem",
        background: "#fff",
        position: "relative",
        margin: "1rem auto",
        fontFamily: "Inter, sans-serif",
      }}>
      {status && (
        <span
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: statusColor,
            color: "#fff",
            borderRadius: "999px",
            padding: "0.25em 0.9em",
            fontSize: "0.95rem",
            fontWeight: 600,
            letterSpacing: 0.5,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            textTransform: "uppercase",
            display: "inline-block",
          }}>
          {statusText}
        </span>
      )}
      {/* <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
          color: "#111827",
        }}>
        {name}
      </h2> */}
      <div
        style={{
          fontSize: "1rem",
          color: "#374151",
          marginBottom: "0.25rem",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
        <span role="img" aria-label="phone">
          📞
        </span>
        <strong>Phone:</strong> {phone}
      </div>
      {alternatePhone && (
        <div
          style={{
            fontSize: "1rem",
            color: "#374151",
            marginBottom: "0.25rem",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
          <span role="img" aria-label="alternate phone">
            📱
          </span>
          <strong>Alternate Phone:</strong> {alternatePhone}
        </div>
      )}
      <div
        style={{
          fontSize: "1rem",
          color: "#374151",
          marginBottom: "0.25rem",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
        <span role="img" aria-label="email">
          ✉️
        </span>
        <strong>Email:</strong> {email}
      </div>
      {bookingCategory && (
        <div
          style={{
            fontSize: "1rem",
            color: "#374151",
            marginBottom: "0.25rem",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
          <span role="img" aria-label="category">
            🏷️
          </span>
          <strong>Booking Category:</strong> {bookingCategory}
        </div>
      )}
      {dateOfBooking && (
        <div
          style={{
            fontSize: "1rem",
            color: "#374151",
            marginBottom: "0.25rem",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
          <span role="img" aria-label="calendar">
            📅
          </span>
          <strong>Date of Booking:</strong> {dateOfBooking}
        </div>
      )}
      {leadSource && (
        <div
          style={{
            fontSize: "1rem",
            color: "#374151",
            marginBottom: "0.25rem",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
          <span role="img" aria-label="source">
            🔗
          </span>
          <strong>Lead Source:</strong> {leadSource}
        </div>
      )}
      {discussionSummary && (
        <div
          style={{
            fontSize: "1rem",
            color: "#2563eb",
            margin: "0.5rem 0",
            fontStyle: "italic",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
          <span role="img" aria-label="discussion">
            💬
          </span>
          <strong>Discussion Summary:</strong> {discussionSummary}
        </div>
      )}
      {details && (
        <div
          style={{
            fontSize: "0.95rem",
            color: "#6b7280",
            marginTop: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
          <span role="img" aria-label="info">
            ℹ️
          </span>
          {details}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;



