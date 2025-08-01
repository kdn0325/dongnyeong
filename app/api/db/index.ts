import { supabase } from "@/lib/supabase";
import { Project } from "@/types";

/**
 * 특정 타입의 프로젝트의 DB를 조회하는 함수
 * @param type - "app" 또는 "openSource" 등 프로젝트 타입
 * @returns 해당 타입의 프로젝트 배열, 에러 시 빈 배열 반환
 */
export async function getProjectsByType(type: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("type", type)
    .order("id", { ascending: true });

  if (error) {
    console.error("[getProjectsByType] Error:", error);
    return [];
  }

  return data ?? [];
}

/**
 * 모든 프로젝트 DB를 조회하는 함수
 * @returns 모든 프로젝트 배열
 */
export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select() // 필요한 필드들
    .order("id", { ascending: true });

  if (error) {
    console.error("[getAllProjects] Error:", error);
    return [];
  }

  return data ?? [];
}
