import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjects } from "@/app/api/db";
import Image from "next/image";

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

  const { title, image_src, image_placeholder } = project;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-6 text-gray-700">{project.description}</p>

      {project.image_src && (
        <div className="w-full h-64 relative mb-6">
          <Image
            alt={title}
            src={image_src}
            width="500"
            height="300"
            style={{ objectFit: "contain" }}
            placeholder={image_placeholder ? "blur" : undefined}
            blurDataURL={image_placeholder}
            priority={false}
            loading="lazy"
          />
        </div>
      )}
    </main>
  );
}
