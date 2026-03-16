export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const kb = 1024;
  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(kb));

  return parseFloat((bytes / Math.pow(kb, i)).toFixed(2)) + " " + sizes[i];
}
