import { getDb } from '../config/db';
import { Admin, AdminRole, CreateAdminDto } from '../models/admin.model';
import bcrypt from 'bcryptjs';

export class AdminsService {
  async getAll(): Promise<Admin[]> {
    const db = getDb();
    const [rows] = await db.execute('SELECT id, email, role FROM admins');
    return rows as Admin[];
  }

  async getById(id: number): Promise<Admin | null> {
    const db = getDb();
    const [rows] = await db.execute(
      'SELECT id, email, role FROM admins WHERE id = ?',
      [id]
    );
    const admins = rows as Admin[];
    return admins.length > 0 ? admins[0] : null;
  }

  async create(admin: CreateAdminDto): Promise<Admin> {
    if (!Object.values(AdminRole).includes(admin.role as AdminRole)) {
      throw new Error(
        `Invalid role: ${admin.role}. Must be one of: ${Object.values(AdminRole).join(', ')}`
      );
    }

    const db = getDb();
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    const [result] = await db.execute(
      'INSERT INTO admins (email, role, password) VALUES (?, ?, ?)',
      [admin.email, admin.role, hashedPassword]
    );
    const insertId = (result as any).insertId;
    return { id: insertId, ...admin, password: hashedPassword };
  }

  async update(id: number, admin: Partial<Admin>): Promise<Admin | null> {
    const db = getDb();
    let updates: string[] = [];
    let values: any[] = [];

    if (admin.email) {
      updates.push('email = ?');
      values.push(admin.email);
    }
    if (admin.role) {
      updates.push('role = ?');
      values.push(admin.role);
    }
    if (admin.password) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      updates.push('password = ?');
      values.push(hashedPassword);
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);
    await db.execute(
      `UPDATE admins SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    const db = getDb();
    await db.execute('DELETE FROM admins WHERE id = ?', [id]);
  }
}
