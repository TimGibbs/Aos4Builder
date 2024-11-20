export default function convertArrayToRecord<T extends { id: string }>(items: T[]): Record<string, T> {
    return items.reduce((acc, item) => {
      acc[item.id] = item;  // Use the item's `id` as the key
      return acc;
    }, {} as Record<string, T>);
  }