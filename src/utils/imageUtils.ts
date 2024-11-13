export const optimizeImageUrl = (url: string, width = 800) => {
  if (url.includes('unsplash.com')) {
    // Add Unsplash's optimization parameters
    return `${url}?w=${width}&auto=format&fit=crop&q=60`;
  }
  return url;
};