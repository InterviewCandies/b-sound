import { SoundEntity } from './sound.entity';

export interface CategoryEntity {
  name: string;
  sounds: SoundEntity[];
}
