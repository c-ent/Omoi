"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  pruneSelection,
  resolveSelectAll,
  toggleSelection,
} from "@hooks/multi-select-utils";

export function useMultiSelect(items = [], getItemId = (item) => item._id) {
  const [selectedIds, setSelectedIds] = useState([]);

  const itemIds = useMemo(() => items.map(getItemId), [items, getItemId]);
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
    setSelectedIds((prev) => pruneSelection(prev, itemIds));
  }, [itemIds]);

  return { selectedIds, selectAll, toggleSelect, handleSelectAll, clearSelection };
}
