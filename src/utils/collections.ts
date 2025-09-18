/**
 * Merges two arrays of objects while ensuring uniqueness based on the `id` field.
 *
 * - Works with any object type `T` that has an `id: string` property.
 * - Maintains the order of the `prev` array.
 * - Appends only new items from `next` whose `id` values are not already in `prev`.
 * - If `next` is empty, simply returns a shallow copy of `prev`.
 *
 * @typeParam T - A type that must contain an `id: string` property.
 * @param prev - The original array of objects.
 * @param next - The new array of objects to merge.
 * @returns A new array containing all items from `prev` plus unique items from `next`.
 *
 * Example:
 * ```ts
 * const a = [{ id: "1", name: "Alice" }];
 * const b = [{ id: "2", name: "Bob" }, { id: "1", name: "Alice" }];
 *
 * mergeUniqueById(a, b);
 * // → [{ id: "1", name: "Alice" }, { id: "2", name: "Bob" }]
 * ```
 */
const mergeUniqueById = <T extends { id: string }>(prev: T[], next: T[]): T[] => {
  if (next.length === 0) return prev.slice();
  const seen = new Set(prev.map((x) => x.id));
  const appended: T[] = [];
  for (const item of next) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      appended.push(item);
    }
  }
  return [...prev, ...appended];
};

export { mergeUniqueById };
