import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjects, getProjectLinks } from "@/app/api/db";
import Image from "next/image";
import { ProjectLink } from "@/types";
import TechnologyListItem from "@/components/TechnologyListItem";
import ProjectLinkItem from "@/components/ProjectLinkItem";

interface Props {
  params: Promise<{ slug: string[] }>;
}

// 빌드 시 정적 생성할 경로를 프로젝트 타이틀 기반 슬러그로 생성 (인코딩 처리)
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: [encodeURIComponent(project.title)],
  }));
}

// 메타데이터를 프로젝트 타이틀 기반 슬러그로 동적 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;
  const slug = decodeURIComponent(awaitedParams.slug[0]);

  const projects = await getAllProjects();
  const project = projects.find((p) => p.title === slug);

  if (!project) {
    return {
      title: "프로젝트를 찾을 수 없습니다",
      description: "유효하지 않은 프로젝트 제목입니다.",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/project/${encodeURIComponent(project.title)}`,
      images: project.image_src
        ? [
            {
              url: project.image_src,
              alt: project.image_placeholder ?? project.title,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const awaitedParams = await params;
  const slug = decodeURIComponent(awaitedParams.slug[0]);

  const projects = await getAllProjects();
  const project = projects.find((p) => p.title === slug);

  if (!project) notFound();

  const {
    id,
    title,
    description,
    image_src,
    team_project,
    technologies = [],
  } = project;

  const project_links: ProjectLink[] = await getProjectLinks(id);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="mb-6 text-muted-foreground">{description}</p>

      <section className="space-y-6">
        <div className="text-sm text-muted-foreground">
          {team_project ? "👥 팀 프로젝트" : "🙋‍♂️ 개인 프로젝트"}
        </div>

        {technologies.length > 0 && (
          <TechnologyListItem technologies={technologies} />
        )}

        {project_links.length > 0 && <ProjectLinkItem links={project_links} />}

        {image_src && (
          <div className="relative w-full max-w-[400px] mx-auto aspect-[4/5] transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_4px_4px_5px_var(--card-shadow)]">
            <Image
              alt={title}
              src={image_src}
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 700px, 900px"
              fill
              loading="lazy"
            />
          </div>
        )}
      </section>
    </main>
  );
}
