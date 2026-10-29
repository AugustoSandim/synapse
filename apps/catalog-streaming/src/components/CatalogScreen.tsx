"use client";

import { SDUINodeRenderer, SDUIProvider } from "@synapse/sdui-engine";
import type { SDUINode } from "@synapse/sdui-engine";
import { catalogRegistry } from "@/lib/registry";

export function CatalogScreen({ root }: { root: SDUINode }) {
  return (
    <SDUIProvider registry={catalogRegistry}>
      <SDUINodeRenderer node={root} />
    </SDUIProvider>
  );
}
