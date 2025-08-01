export type ProjectLink = {
  type: string;
  url: string;
};

export interface Project {
  id: number;
  type: "app" | "openSource";
  title: string;
  description: string;
  image_src: string;
  image_placeholder: string;
  team_project: boolean;
  technologies: string[];
}
