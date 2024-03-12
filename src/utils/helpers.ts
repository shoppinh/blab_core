export const hideInformation = (str?: string): string => {
  if (!str) {
    return '';
  }
  if (str.length < 10) {
    return str;
  }
  return `${str.slice(0, 6)}...${str.slice(-4)}`;
};

export function paginate(items: any[], pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}
