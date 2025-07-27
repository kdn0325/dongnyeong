import { posts } from "#site/content";
import { MDXContent } from "@/components/MDXComponent";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string[];
  };
}

// URL 파라미터로부터 슬러그를 받아 해당하는 포스트를 반환하는 함수
async function getPostFromParams(params: Props["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);
  return post;
}

// 각 포스트의 메타데이터를 동적으로 생성하는 함수
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  // Open Graph 이미지용 쿼리 파라미터 생성
  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `api/og?${ogSearchParams.toString}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

// 정적 생성 시 필요한 모든 슬러그 경로를 반환하는 함수
export async function generateStaticParams(): Promise<Props["params"][]> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPostFromParams(params);
  // 포스트가 없거나 공개되지 않은 경우 404 페이지로 이동
  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
