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
  // Phase 5 — Product CMS
  category_id: string | null;
  featured: boolean;
  popular: boolean;
  is_new: boolean;
  best_seller: boolean;
  short_description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  og_image: string | null;
  canonical_url: string | null;
  meta_robots: string | null;
}

export interface ProductTaxonomyRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image_path: string | null;
  published: boolean;
  published_at: string | null;
  display_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}
export type ProductCategoryRow = ProductTaxonomyRow;
export type ProductIndustryRow = ProductTaxonomyRow;

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
  // Phase 3 — settings expansion
  company_name: string;
  company_tagline: string | null;
  company_description: string | null;
  whatsapp: string | null;
  address_street: string | null;
  address_municipality: string | null;
  address_district: string | null;
  address_postal_code: string | null;
  address_country: string | null;
  business_hours: Json;
  service_areas: Json;
  social_links: Json;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  seo_og_image: string | null;
  hero_eyebrow: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  footer_description: string | null;
  footer_copyright: string | null;
  updated_at: string;
}

export interface HomeSectionRow {
  id: string;
  section_key: string;
  eyebrow: string | null;
  title: string | null;
  highlight: string | null;
  subtitle: string | null;
  content: string | null;
  button_text: string | null;
  button_link: string | null;
  button2_text: string | null;
  button2_link: string | null;
  image: string | null;
  icon: string | null;
  meta: Json;
  display_order: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface HomeFeatureRow {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  published: boolean;
  published_at: string | null;
  display_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface HomeStatRow {
  id: string;
  label: string;
  value: string | null;
  suffix: string | null;
  icon: string | null;
  published: boolean;
  published_at: string | null;
  display_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ActivityLogRow {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  entity: string;
  action: string;
  field: string | null;
  old_value: string | null;
  new_value: string | null;
  created_at: string;
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
      product_categories: {
        Row: ProductCategoryRow;
        Insert: Partial<ProductCategoryRow> & { name: string; slug: string };
        Update: Partial<ProductCategoryRow>;
        Relationships: [];
      };
      product_industries: {
        Row: ProductIndustryRow;
        Insert: Partial<ProductIndustryRow> & { name: string; slug: string };
        Update: Partial<ProductIndustryRow>;
        Relationships: [];
      };
      home_sections: {
        Row: HomeSectionRow;
        Insert: Partial<HomeSectionRow> & { section_key: string };
        Update: Partial<HomeSectionRow>;
        Relationships: [];
      };
      home_features: {
        Row: HomeFeatureRow;
        Insert: Partial<HomeFeatureRow> & { title: string; description: string };
        Update: Partial<HomeFeatureRow>;
        Relationships: [];
      };
      home_statistics: {
        Row: HomeStatRow;
        Insert: Partial<HomeStatRow> & { label: string };
        Update: Partial<HomeStatRow>;
        Relationships: [];
      };
      activity_log: {
        Row: ActivityLogRow;
        Insert: {
          id?: string;
          actor_id?: string | null;
          actor_email?: string | null;
          entity: string;
          action: string;
          field?: string | null;
          old_value?: string | null;
          new_value?: string | null;
          created_at?: string;
        };
        Update: Partial<ActivityLogRow>;
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
