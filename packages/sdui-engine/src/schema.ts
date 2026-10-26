import { z } from "zod";

export const SDUINodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().min(1, "Node ID is required"),
    type: z.string().min(1, "Node type is required"),
    props: z.record(z.unknown()).default({}),
    children: z.array(SDUINodeSchema).optional().default([]),
  }),
);

export const SDUIScreenSchema = z.object({
  screen: z.string(),
  version: z.string(),
  root: SDUINodeSchema,
});

export type SDUINode = z.infer<typeof SDUINodeSchema>;
export type SDUIScreen = z.infer<typeof SDUIScreenSchema>;
