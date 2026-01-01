export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "pending" | "contacted" | "completed";
}
