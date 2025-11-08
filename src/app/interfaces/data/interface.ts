export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Collections =
  | "employees"
  | "clients"
  | "projects"
  | "deliverables"
  | "projectDeliverables"
  | "events"
  | "updates"
  | "imageSelections"
  | "selectedImages";

export type BookingType =
  | "wedding"
  | "pre_wedding"
  | "post_wedding"
  | "anniversary"
  | "birthday"
  | "corporate_shoot"
  | "baby_bump"
  | "rice_cereony"
  | "other";
export type LeadType =
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "friends"
  | "wordofmouth"
  | "referrel"
  | "other";
export type ProjectStatus =
  | "open"
  | "close"
  | "reopen"
  | "withdrawn"
  | "on_hold"
  | "unknown";

export type DeliverableType =
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

export type EmployeeRoleType = "admin" | "manager" | "employee";
export type EmployeeStatusType = "active" | "inactive" | "on_leave";
export type EmploymentType = "full_time" | "part_time" | "freelancer";

export interface Client extends Entity {
  name: string;
  phone: string;
  alternatePhone: string;
  email: string;
  address: string;
  isPremiumClient: boolean;
  additionalDetails?: string;
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
  employmentType: EmploymentType;
  status: EmployeeStatusType;
  role: EmployeeRoleType;
}

export interface Project extends Entity {
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
  trackCount: number;
  lastTrackedAt: Date | null;
}

type UpdateStatus =
  | "incomplete"
  | "not_started"
  | "in_progress"
  | "completed"
  | "on_hold"
  | "cancelled"
  | "unknown";
interface UpdateType {
  type:
    | "payment"
    | "drive_backup"
    | "team_breafing"
    | "drive_uplaod"
    | "image_transfer"
    | "sheet_update"
    | "contract_signing"
    | "other";
  status: UpdateStatus;
}

export interface Update extends Entity {
  projectId: string;
  title: string;
  description: string;
  updateType: UpdateType;
}

export interface DeliveryUpdate extends Entity {
  title: string;
  status: "not_started" | "done" | "in_progress";
  lastUpdatedOn: Date;
}

export interface Deliverable extends Entity {
  type: DeliverableType;
  displayName: string;
  additionalDetails: string;
  deliveryTime: number; //In days
  assetType: "physical" | "digital";
  updateTemplates: Array<DeliveryUpdate>;
}

export interface ProjectDeliverable extends Deliverable {
  projectId: string;
  deliverableId: string;
  deliveryUpdates: Array<DeliveryUpdate>;
  isDelivered: boolean;
}

export interface ProjectsDeliverable extends Entity {
  projectId: string;
  deliverableId: string;
  deliveryUpdates: Array<DeliveryUpdate>;
}

export interface Event extends Entity {
  projectId: string;
  startDateTime: Date;
  endDateTime: Date;
  venue: string;
  assignment: string;
  photographerCount: number;
  videographerCount: number;
  droneOperatorCount: number;
  lightmanCount: number;
  helperCount: number;
  team: Array<{ employeeId: string; isLead: string }>;
  status: "upcoming" | "done" | "cancelled" | "postponed" | "in_progress";
}

export interface ImageSelectionEntry extends Entity {
  projectId: string;
  folderIds: Array<string>;
  isSelectionAllowed: boolean;
  maxSelectionCount: number;
}

export interface SelectedImage extends Entity {
  projectId: string;
  imageId: string;
  imageFileName: string;
  folderId: string;
  folderName: string;
}

export interface MerchantDetails {
  merchantId: string;
  mail: string;
  merchantDetails: {
    id: string;
    businessName: string;
    logo: string;
    isActive: boolean;
    description: string;
  };
}
