export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  is_admin: boolean;
  created_at: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  phone: string;
  message: string;
  package: string | null;
  status: "new" | "handled";
  created_at: string;
};
