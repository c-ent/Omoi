import { describe, expect, it } from "vitest";
import {
  pruneSelection,
  resolveSelectAll,
  toggleSelection,
} from "@hooks/multi-select-utils";

describe("multi-select-utils", () => {
  it("toggles ids in a selection", () => {
    expect(toggleSelection([], "a")).toEqual(["a"]);
    expect(toggleSelection(["a"], "a")).toEqual([]);
    expect(toggleSelection(["a"], "b")).toEqual(["a", "b"]);
  });

  it("selects or clears all ids", () => {
    expect(resolveSelectAll(false, ["a", "b"])).toEqual(["a", "b"]);
    expect(resolveSelectAll(true, ["a", "b"])).toEqual([]);
  });

  it("drops ids that are no longer available", () => {
    expect(pruneSelection(["a", "b"], ["b"])).toEqual(["b"]);
    expect(pruneSelection(["a", "b"], [])).toEqual([]);
  });
});
