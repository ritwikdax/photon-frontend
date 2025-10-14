interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

type BookingType =
  | "wedding"
  | "pre_wedding"
  | "post_wedding"
  | "anniversary"
  | "birthday"
  | "corporate_shoot"
  | "baby_bump"
  | "rice_cereony"
  | "other";
type LeadType =
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "friends"
  | "wordofmouth"
  | "referrel"
  | "other";
type ProjectStatus = "open" | "close" | "reopen" | "withdrawn";

type UpdateType =
  | "info"
  | "error"
  | "blocker"
  | "success"
  | "failed"
  | "unblocker";
type DeliverableType =
  | "raw_photos"
  | "raw_videoes"
  | "album"
  | "pendrive"
  | "hard_drive"
  | "teaser"
  | "reels"
  | "edited_photos"
  | "full_video"
  | "other";

export interface Client extends Entity {
  name: string;
  phone: string;
  alternatePhone: string;
  email: string;
  address: string;
}

export interface Employee extends Entity {
  name: string;
  doj: Date;
  expertise: Array<string>;
  address: string;
  phone: string;
  alternatePhone: string;
  email: string;
  rating: number;
}

export interface Project extends Entity {
  significantId: string;
  name: string;
  phone: string;
  alternatePhone: string;
  email: string;
  leadSource: LeadType;
  bookingCategory: BookingType;
  dateOfBooking: Date;
  status: ProjectStatus;
  discussionSummary: string;
  details: string;
  clientId?: string;
}

export interface Update extends Entity {
  title: string;
  description: string;
  type: UpdateType;
}

export interface DeliveryUpdate extends Entity {
  title: string;
  status: "not_started" | "done" | "in_progress";
}

export interface Deliverable extends Entity {
  type: DeliverableType;
  deliveryTime: number; //In days
  assetType: "physical" | "digital";
  deliveryUpdates: Array<DeliveryUpdate>;
  isDelivered: boolean;
  projectId: string;
}

export interface ProjectsDeliverable extends Entity {
  projectId: string;
  deliverableId: string;
  deliveryUpdates: Array<DeliveryUpdate>;
}

export interface Event extends Entity {
  projectId: string;
  date: Date;
  venue: string;
  assignment: string;
  team: Array<{ employeeId: string; isLead: string }>;
  status: "upcoming" | "done";
}
