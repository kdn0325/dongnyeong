import { z } from "zod";

export const ProjectLinkSchema = z.object({
  type: z.string(),
  url: z.string().pipe(z.url()),
});

export const ProjectSchema = z.object({
  id: z.number(),
  type: z.enum(["app", "openSource"]),
  title: z.string(),
  description: z.string(),
  image_src: z.string().pipe(z.url()),
  image_placeholder: z.string(),
  team_project: z.boolean(),
  technologies: z.array(z.string()),
});

export const ProjectLinksArraySchema = z.array(ProjectLinkSchema);
export const ProjectsArraySchema = z.array(ProjectSchema);
