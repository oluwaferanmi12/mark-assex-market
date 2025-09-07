export interface CreateSupportInterface {
  issue: string;
  description: string;
  attachment: string;
}

export interface TicketEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface SupportTicketAssignee {
  createdAt: string;
  status: string;
  admin: TicketEntity;
}

export interface SupportTicketMessage {
  id: string;
  message: string;
  type: string;
  attachment: string;
  createdAt: string;
  user: TicketEntity;
  admin: null | string;
}

export interface SupportMessage {
  id: string;
  ticketNumber: string;
  issue: string;
  description: string;
  status: "CLOSED" | "OPEN";
  adminReadStatus: string;
  userReadStatus: string;
  createdAt: string;
  closedAt: string;
  user: TicketEntity;
  SupportTicketAssignee: SupportTicketAssignee[];
  SupportTicketMessage: SupportTicketMessage[];
}

export interface ReplyChat {
  message: string;
  type: "USER" | "ADMIN";
  attachment: string;
  id: string;
}
