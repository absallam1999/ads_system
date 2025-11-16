import { AdminsService } from '../services/admins.service';
import { AdminRole, CreateAdminDto } from '../models/admin.model';

const admin: CreateAdminDto = {
  email: 'superadmin@example.com',
  role: AdminRole.SUPER_ADMIN,
  password: 'SuperAdmin123',
};

async function seedAdmins() {
  const adminsService = new AdminsService();

  try {
    const allAdmins = await adminsService.getAll();
    const existing = allAdmins.find((a) => a.email === admin.email);

    if (existing) {
      console.log(`Admin already exists: ${admin.email}`);
      return;
    }

    const created = await adminsService.create(admin);
    console.log(`Super admin seeded: ${created.email} (id: ${created.id})`);
  } catch (err) {
    console.error('Error seeding admins:', err);
  }
}

export default seedAdmins;
