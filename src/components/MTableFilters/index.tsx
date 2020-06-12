export function getTableFilters<T extends { value: number, name: string }>(dicts: Array<T>, conditions: (item: T) => Boolean) {
  return dicts.filter(conditions).map((item) => ({ value: item.value, text: item.name }));
}
