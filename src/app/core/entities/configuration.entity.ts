export const SUPPORT_SOUNDS = [
  'bell',
  'bird',
  'thunder',
  'water',
  'waves',
  'wind',
] as const;

export type SoundType = typeof SUPPORT_SOUNDS[0];

export interface ConfigurationEntity {
  time: number;
  loop: boolean;
  bell: number;
  bird: number;
  thunder: number;
  water: number;
  waves: number;
  wind: number;
}
