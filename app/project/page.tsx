import { Metadata } from "next";
import { getProjectsByType } from "../api/db";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Project",
  description:
    "안녕하세요. 최상의 사용자 경험(UX)과 더 나은 개발자 경험(DX)을 고려하는 모바일 엔지니어 김동녕입니다.",
};

export default async function ProjectPage() {
  const app = await getProjectsByType("app");
  const openSource = await getProjectsByType("openSource");

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12 py-10">
      {/* 앱 섹션 */}
      <section className="w-full mb-16">
        <h1 className="text-[2.3rem] font-medium text-[var(--txt)] pt-2">
          <strong className="text-[var(--txt-secondary)]">App</strong>
        </h1>
        <p className="mt-4 text-left">제가 참여한 다양한 앱들을 소개합니다</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10">
          {app.map((props) => (
            <ProjectCard key={props.id} {...props} />
          ))}
        </ul>
      </section>

      <section className="w-full">
        <h1 className="text-[2.3rem] font-medium text-[var(--txt)] pt-2">
          <strong className="text-[var(--txt-secondary)]">Open Source</strong>
        </h1>
        <p className="mt-4 text-left">
          GitHub에서 관리 중인 오픈소스 프로젝트들입니다.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10">
          {openSource.map((props) => (
            <ProjectCard key={props.id} {...props} />
          ))}
        </ul>
      </section>
    </main>
  );
}
