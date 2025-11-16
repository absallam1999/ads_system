export enum AdTemplate {
  BANNER = 'banner',
  FULLSCREEN = 'fullscreen',
  CARD = 'card',
  VIDEO = 'video',
  CUSTOM = 'custom',
}

export interface Ad {
  id?: number;
  image: Buffer;
  title: string;
  description: string;
  link: string;
  template: AdTemplate;
  created_at?: Date;
  updated_at?: Date;
}

export type CreateAdDto = Omit<Ad, 'id' | 'created_at' | 'updated_at'>;
export type UpdateAdDto = Partial<Omit<Ad, 'id' | 'created_at' | 'updated_at'>>;
