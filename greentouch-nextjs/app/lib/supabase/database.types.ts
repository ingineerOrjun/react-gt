// Hand-authored to match supabase/migrations (Sprint 2). Replace with
// `supabase gen types typescript --linked` output once the project is linked.

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface ProductRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_path: string | null;
  published: boolean;
  published_at: string | null;
  display_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_path: string | null;
  published: boolean;
  published_at: string | null;
  display_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'archived';
  created_at: string;
}

export interface SiteSettingsRow {
  id: string;
  singleton: boolean;
  site_title: string;
  contact_email: string;
  contact_phone: string | null;
  address: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  updated_at: string;
}

export interface ProfileRow {
  id: string;
  full_name: string | null;
  role: 'admin';
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          image_path?: string | null;
          published?: boolean;
          published_at?: string | null;
          display_order?: number;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<ProductRow>;
        Relationships: [];
      };
      blogs: {
        Row: BlogRow;
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          image_path?: string | null;
          published?: boolean;
          published_at?: string | null;
          display_order?: number;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<BlogRow>;
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessageRow;
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status?: ContactMessageRow['status'];
          created_at?: string;
        };
        Update: Partial<ContactMessageRow>;
        Relationships: [];
      };
      site_settings: {
        Row: SiteSettingsRow;
        Insert: {
          id?: string;
          singleton?: boolean;
          site_title?: string;
          contact_email?: string;
          contact_phone?: string | null;
          address?: string | null;
          facebook_url?: string | null;
          twitter_url?: string | null;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          updated_at?: string;
        };
        Update: Partial<SiteSettingsRow>;
        Relationships: [];
      };
      profiles: {
        Row: ProfileRow;
        Insert: {
          id: string;
          full_name?: string | null;
          role?: 'admin';
          created_at?: string;
        };
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
