class Utils {
  getFriendlyName(name: string): string {
    return name.split('_').join(' ');
  }
}

export default new Utils();
