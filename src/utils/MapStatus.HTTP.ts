export default function mapStatusHTTP(status: string): number {
  const statusHTTPMap: Record<string, number> = {
    INVALID_DATA: 400,
  };

  return statusHTTPMap[status] ?? 500;
}