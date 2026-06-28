"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  pruneSelection,
  resolveSelectAll,
  selectionsEqual,
  toggleSelection,
} from "@hooks/multi-select-utils";

const defaultGetItemId = (item) => item._id;

export function useMultiSelect(items = [], getItemId = defaultGetItemId) {
  const [selectedIds, setSelectedIds] = useState([]);

  const itemIdsKey = useMemo(
    () => items.map(getItemId).join("\0"),
    [items, getItemId]
  );

  const itemIds = useMemo(
    () => (itemIdsKey ? itemIdsKey.split("\0") : []),
    [itemIdsKey]
  );

  const selectAll = items.length > 0 && selectedIds.length === items.length;

  const toggleSelect = useCallback((id) => {
    setSelectedIds((prev) => toggleSelection(prev, id));
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedIds((prev) => resolveSelectAll(selectAll, itemIds));
  }, [selectAll, itemIds]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  useEffect(() => {
    const ids = itemIdsKey ? itemIdsKey.split("\0") : [];
    setSelectedIds((prev) => {
      const next = pruneSelection(prev, ids);
      return selectionsEqual(prev, next) ? prev : next;
    });
  }, [itemIdsKey]);

  return { selectedIds, selectAll, toggleSelect, handleSelectAll, clearSelection };
}
