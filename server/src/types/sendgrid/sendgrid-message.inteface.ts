export interface SendgridMessage {
  to: string;

  from: string;

  subject: string;

  text?: string;

  html: string;
}
