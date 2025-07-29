export function isValidUrl(url: string | undefined): boolean {
    try {
      if (!url) return false;
      new URL(url);
      return !url.includes("pharmacy-assets") && !url.includes("partner-assets")  ;
    } catch (_) {
      return false;
    }
  }

  export default isValidUrl;