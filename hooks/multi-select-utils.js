export function toggleSelection(selectedIds, id) {
  return selectedIds.includes(id)
    ? selectedIds.filter((itemId) => itemId !== id)
    : [...selectedIds, id];
}

export function resolveSelectAll(selectAll, itemIds) {
  return selectAll ? [] : itemIds;
}

export function pruneSelection(selectedIds, itemIds) {
  return selectedIds.filter((id) => itemIds.includes(id));
}

export function selectionsEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((id, index) => id === b[index]);
}
