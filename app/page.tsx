import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/PostItem";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);

  return (
    <>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            안녕하세요! 모바일 엔지니어 김동녕 입니다.
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Front-End Developer · Mobile Developer · DX(Developer Experience)
          </p>
          <p className="mb-8 text-lg text-muted-foreground"></p>
          <p className="mb-8 text-lg text-muted-foreground"></p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Link
              href="/blog"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              블로그 바로가기
            </Link>
            <Link
              href={siteConfig.link.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto"
              )}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl py-6 lg:py-10 flex flex-col items-center space-y-6 mt-60 px-4">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-center">
          최근 포스트
        </h2>
        <ul className="flex flex-col w-full max-w-3xl mx-auto">
          {latestPosts.map(
            (post) =>
              post.published && (
                <li
                  key={post.slug}
                  className="first:border-t first:border-border"
                >
                  <PostItem
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                  />
                </li>
              )
          )}
        </ul>
      </section>
    </>
  );
}
