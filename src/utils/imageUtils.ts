export const optimizeImageUrl = (url: string, width = 800) => {
  if (url.includes('unsplash.com')) {
    // Add Unsplash's optimization parameters for better performance
    return `${url}?w=${width}&q=75&fm=webp&fit=crop`;
  }
  return url;
};