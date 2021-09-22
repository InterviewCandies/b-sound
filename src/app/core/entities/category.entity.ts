import { SoundEntity } from './sound.entity';

export interface CategoryEntity {
  name: string;
  _id?: string;
  sounds: SoundEntity[];
}
