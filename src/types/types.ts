export interface User {
  first_name?: string;
  last_name?: string;
  location?: string | null;
  portfolio_url?: string | null;
  name?: string;
}

export interface Image {
  id: string;
  alt_description?: string | null;
  urls: {
    small: string;
    regular: string;
    full?: string;
  };
  user?: User | null;
  likes?: number;
  description?: string | null;
}

export interface ApiResponse {
  results: Image[];
  total_pages: number;
}
