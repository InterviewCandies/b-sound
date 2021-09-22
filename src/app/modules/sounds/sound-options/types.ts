export interface AudioRecurence {
  audio: HTMLAudioElement;
  interval: ReturnType<typeof setInterval>;
  timeout?: ReturnType<typeof setTimeout>;
  timer?: number;
}
