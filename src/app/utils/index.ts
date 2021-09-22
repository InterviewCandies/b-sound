class Utils {
  getFriendlyName(name: string): string {
    return name.split('_').join(' ');
  }
  convertToMs(minutes: number): number {
    return minutes * 60 * 60;
  }
}

export default new Utils();
