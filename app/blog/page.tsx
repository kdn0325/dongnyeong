import { posts } from "#site/content";
import { PostItem } from "@/components/PostItem";
import { Metadata } from "next";
import "@/styles/mdx.css";
import { QueryPagination } from "@/components/Query-Pagination";

export const metadata: Metadata = {
  title: "Dongnyeong's Dev Blog",
  description:
    "단순히 내가 배운걸 다시 잊어버리지 않기 위해 그냥 적어놓습니다.",
};

const POSTS_PER_PAGE = 5;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  //post.published true인 포스트만 필터링하고 최신순 정렬
  const sortedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  // 현재 페이지에 표시할 포스트 자르기
  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* 헤더 섹션 */}
      <section className="mb-10">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
            데브핑의 블로그
          </h1>
          <p className="text-muted-foreground text-lg">
            그냥 개발하면서 느낀 거 주저리주저리 적는 곳
          </p>
        </div>
      </section>

      {/* 포스트 리스트 섹션 */}
      <section>
        <hr className="mb-6" />
        {displayPosts?.length > 0 ? (
          <ul className="space-y-6">
            {displayPosts.map((post) => (
              <li key={post.slug}>
                <PostItem
                  slug={post.slug}
                  date={post.date}
                  title={post.title}
                  description={post.description}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground">
            Nothing to see here yet.
          </p>
        )}

        {/* 페이지네이션 */}
        <div className="mt-10 flex justify-end">
          <QueryPagination totalPages={totalPages} />
        </div>
      </section>
    </main>
  );
}
