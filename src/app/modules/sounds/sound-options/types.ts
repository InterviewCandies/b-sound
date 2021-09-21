export interface AudioRecurence {
  audio: HTMLAudioElement;
  interval: ReturnType<typeof setInterval>;
  timer: number;
}
