/**
 * Converts a Google Drive share link to a direct download link for images.
 */
export function getDirectDriveLink(url: string): string {
  if (!url) return '';
  
  // Check if it's a Google Drive link
  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/\/d\/(.+?)\//) || url.match(/id=(.+?)(&|$)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/u/0/d/${fileIdMatch[1]}`;
      // Alternative: `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`
      // But lh3 is often more reliable for direct embedding
    }
  }
  
  return url;
}
