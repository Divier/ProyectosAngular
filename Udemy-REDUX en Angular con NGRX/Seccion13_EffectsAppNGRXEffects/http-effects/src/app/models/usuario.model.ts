export interface Usuario {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: DataUsuario[];
  support: Support;
}

export interface DataUsuario {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}
