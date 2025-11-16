import { getDb } from '../config/db';
import { Ad, AdTemplate, CreateAdDto } from '../models/ad.model';

export class AdsService {
  async getAll(): Promise<Ad[]> {
    const db = getDb();
    const [rows] = await db.execute('SELECT * FROM ads');
    return rows as Ad[];
  }

  async getById(id: number): Promise<Ad | null> {
    const db = getDb();
    const [rows] = await db.execute('SELECT * FROM ads WHERE id = ?', [id]);
    const ads = rows as Ad[];
    return ads.length > 0 ? ads[0] : null;
  }

  private validateTemplate(template: any): asserts template is AdTemplate {
    if (!Object.values(AdTemplate).includes(template as AdTemplate)) {
      throw new Error(
        `Invalid template: "${template}". Allowed: ${Object.values(AdTemplate).join(', ')}`
      );
    }
  }

  async create(ad: CreateAdDto): Promise<Ad> {
    this.validateTemplate(ad.template);

    const db = getDb();
    const [result] = await db.execute(
      `INSERT INTO ads (image, title, description, link, template)
       VALUES (?, ?, ?, ?, ?)`,
      [ad.image, ad.title, ad.description, ad.link, ad.template]
    );
    const insertId = (result as any).insertId;
    return { id: insertId, ...ad };
  }

  async update(id: number, ad: Partial<Ad>): Promise<Ad | null> {
    const db = getDb();
    let updates: string[] = [];
    let values: any[] = [];

    if (ad.image) {
      updates.push('image = ?');
      values.push(ad.image);
    }
    if (ad.title) {
      updates.push('title = ?');
      values.push(ad.title);
    }
    if (ad.description) {
      updates.push('description = ?');
      values.push(ad.description);
    }
    if (ad.link) {
      updates.push('link = ?');
      values.push(ad.link);
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);
    await db.execute(
      `UPDATE ads SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    const db = getDb();
    await db.execute('DELETE FROM ads WHERE id = ?', [id]);
  }
}
