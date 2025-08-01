import { supabase } from "@/lib/supabase";
import { Project, ProjectLink } from "@/types";
import {
  ProjectsArraySchema,
  ProjectLinksArraySchema,
} from "@/schemas/projectSchemas";
import { treeifyError } from "zod";

/**
 * 특정 타입의 프로젝트의 DB를 조회하는 함수
 */
export async function getProjectsByType(type: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("type", type)
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  const parsed = ProjectsArraySchema.safeParse(data);
  if (!parsed.success) {
    console.error(treeifyError(parsed.error));
    return [];
  }

  return parsed.data;
}

/**
 * 모든 프로젝트 DB를 조회하는 함수
 */
export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  const parsed = ProjectsArraySchema.safeParse(data);
  if (!parsed.success) {
    console.error(treeifyError(parsed.error));
    return [];
  }

  return parsed.data;
}

/**
 * 특정 프로젝트 ID에 연결된 프로젝트 링크들만 조회
 */
export async function getProjectLinks(
  projectId: string
): Promise<ProjectLink[]> {
  const { data, error } = await supabase
    .from("project_links")
    .select("type, url")
    .eq("project_id", projectId);

  if (error) {
    console.error(error);
    return [];
  }

  const parsed = ProjectLinksArraySchema.safeParse(data);
  if (!parsed.success) {
    console.error(treeifyError(parsed.error));
    return [];
  }

  return parsed.data;
}
