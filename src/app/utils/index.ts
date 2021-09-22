class Utils {
  getFriendlyName(name: string): string {
    return name.split('_').join(' ');
  }
  convertToMs(minutes: number): number {
    return minutes * 60 * 60;
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('bsound_token');
  }
}

export default new Utils();
