/** Client-safe shared types for support tickets (page /contacto). */

export const SUPPORT_TICKET_STATUSES = ["nuevo", "en_proceso", "resuelto", "cerrado"] as const;
export type SupportTicketStatus = (typeof SUPPORT_TICKET_STATUSES)[number];

export const SUPPORT_STATUS_LABEL: Record<SupportTicketStatus, { es: string; en: string }> = {
  nuevo: { es: "Nuevo", en: "New" },
  en_proceso: { es: "En proceso", en: "In progress" },
  resuelto: { es: "Resuelto", en: "Resolved" },
  cerrado: { es: "Cerrado", en: "Closed" },
};

export const SUPPORT_CATEGORY_LABEL: Record<string, { es: string; en: string }> = {
  "problema-tecnico": { es: "Problema técnico", en: "Technical problem" },
  "pregunta-cuenta": { es: "Pregunta sobre mi cuenta", en: "Account question" },
  facturacion: { es: "Facturación", en: "Billing" },
  privacidad: { es: "Privacidad y datos", en: "Privacy and data" },
  otro: { es: "Otro", en: "Other" },
};

export const MAX_COMMENT_CHARS = 2000;

export type SupportComment = {
  id: string;
  createdAt: string;
  body: string;
  isInternal: boolean;
  authorEmail: string | null;
};

export type SupportTicket = {
  id: string;
  createdAt: string;
  updatedAt: string;
  nombre: string;
  email: string;
  categoria: string;
  mensaje: string;
  estado: SupportTicketStatus;
  appVersion: string | null;
  userAgent: string | null;
  userId: string | null;
  comments: SupportComment[];
};

export function isSupportStatus(value: string): value is SupportTicketStatus {
  return (SUPPORT_TICKET_STATUSES as readonly string[]).includes(value);
}

export function shortTicketId(id: string): string {
  return id.slice(0, 8);
}
