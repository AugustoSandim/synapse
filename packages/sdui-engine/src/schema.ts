import { z } from "zod";

export interface SDUINode {
  id: string;
  type: string;
  props: Record<string, unknown>;
  children: SDUINode[];
}

const uniqueSiblingIds = (children: SDUINode[]): boolean =>
  new Set(children.map((child) => child.id)).size === children.length;

export const SDUINodeSchema: z.ZodType<SDUINode, z.ZodTypeDef, unknown> =
  z.lazy(() =>
    z.object({
      id: z.string().min(1, "Node ID is required"),
      type: z.string().min(1, "Node type is required"),
      props: z.record(z.unknown()).default({}),
      children: z
        .array(SDUINodeSchema)
        .optional()
        .default([])
        .refine(uniqueSiblingIds, {
          message: "Sibling node IDs must be unique",
        }),
    }),
  );

export const SDUIScreenSchema = z.object({
  screen: z.string(),
  version: z.string(),
  root: SDUINodeSchema,
});

export type SDUIScreen = z.infer<typeof SDUIScreenSchema>;
