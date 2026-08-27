export interface ContactFormData {
  name: string;
  email: string;
  roleType: string;
  message: string;
  honeypot?: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  roleType?: string;
  message?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof ContactFormData, string[]>>;
}
