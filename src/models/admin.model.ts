export enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  EDITOR = 'editor',
}

export interface Admin {
  id?: number;
  email: string;
  role: AdminRole;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export type CreateAdminDto = Omit<Admin, 'id' | 'created_at' | 'updated_at'>;
export type UpdateAdminDto = Partial<
  Pick<Admin, 'email' | 'role' | 'password' | 'created_at' | 'updated_at'>
>;
