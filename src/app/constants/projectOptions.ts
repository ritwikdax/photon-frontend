import { LeadType, BookingType, ProjectStatus } from "@/app/interfaces/data/interface";

// Lead Source Constants
export const LEAD_SOURCE_LABELS: Record<LeadType, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  friends: "Friends",
  wordofmouth: "Word of Mouth",
  referrel: "Referral",
  other: "Other",
};

export const leadSourceOptions: { value: LeadType; label: string }[] = 
  Object.entries(LEAD_SOURCE_LABELS).map(([value, label]) => ({
    value: value as LeadType,
    label,
  }));

// Booking Category Constants
export const BOOKING_CATEGORY_LABELS: Record<BookingType, string> = {
  wedding: "Wedding",
  pre_wedding: "Pre Wedding",
  post_wedding: "Post Wedding",
  anniversary: "Anniversary",
  birthday: "Birthday",
  corporate_shoot: "Corporate Shoot",
  baby_bump: "Baby Bump",
  rice_cereony: "Rice Ceremony",
  other: "Other",
};

export const bookingCategoryOptions: { value: BookingType; label: string }[] = 
  Object.entries(BOOKING_CATEGORY_LABELS).map(([value, label]) => ({
    value: value as BookingType,
    label,
  }));

// Project Status Constants
export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  open: "Open",
  close: "Close",
  reopen: "Reopen",
  withdrawn: "Withdrawn",
  on_hold: "On Hold",
  unknown: "Unknown",
};

export const statusOptions: { value: ProjectStatus; label: string }[] = 
  Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => ({
    value: value as ProjectStatus,
    label,
  }));

// Helper functions for O(1) lookup
export const getLeadSourceLabel = (value: LeadType): string => LEAD_SOURCE_LABELS[value];
export const getBookingCategoryLabel = (value: BookingType): string => BOOKING_CATEGORY_LABELS[value];
export const getProjectStatusLabel = (value: ProjectStatus): string => PROJECT_STATUS_LABELS[value];
