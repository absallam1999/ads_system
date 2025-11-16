import { getDb } from '../config/db';
import { Admin } from '../models/admin.model';
import { generateToken } from '../config/jwt';
import bcrypt from 'bcryptjs';

export class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<{ token: string; admin: Omit<Admin, 'password'> }> {
    const db = getDb();
    const [rows] = await db.execute('SELECT * FROM admins WHERE email = ?', [
      email,
    ]);
    const admins = rows as Admin[];

    if (admins.length === 0) {
      throw new Error('Invalid credentials');
    }

    const admin = admins[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ id: admin.id, role: admin.role });
    const { password: _, ...adminWithoutPass } = admin;

    return { token, admin: adminWithoutPass };
  }

  async forgotPassword(email: string): Promise<void> {
    const db = getDb();
    const [rows] = await db.execute('SELECT * FROM admins WHERE email = ?', [
      email,
    ]);
    const admins = rows as Admin[];

    if (admins.length === 0) {
      throw new Error('User not found');
    }

    // TODO: Implement actual password reset logic (send email with reset token)
    console.log(`Password reset requested for ${email}`);
  }
}
