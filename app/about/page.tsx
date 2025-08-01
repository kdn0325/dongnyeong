import GithubActivity from "@/components/GithubActivity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "안녕하세요. 최상의 사용자 경험(UX)과 더 나은 개발자 경험(DX)을 고려하는 모바일 엔지니어 김동녕입니다.",
};

export default async function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12 py-10">
      <div className="mb-10">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
          About Me
        </h1>
        <hr className="mt-4 border-muted" />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
          <Avatar className="h-40 w-40">
            <AvatarImage src="/avatar.png" alt={siteConfig.author} />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold mt-4 text-center md:text-left">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center md:text-left">
            Front-End Developer
          </p>
        </div>
        <div className="flex-1 space-y-6">
          <p className="text-muted-foreground text-lg leading-relaxed text-justify">
            안녕하세요.{" "}
            <span className="font-semibold text-[#1565c0] dark:text-[#ff9800]">
              최상의 사용자 경험(UX)
            </span>
            과{" "}
            <span className="font-semibold text-[#1565c0] dark:text-[#ff9800]">
              더 나은 개발자 경험(DX)
            </span>
            을 고려하는 모바일 엔지니어{" "}
            <span className="font-semibold text-[#1565c0] dark:text-[#ff9800]">
              김동녕
            </span>
            입니다.
          </p>

          <ul className="list-disc pl-5 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li>변화에 빠르게 대응할 수 있는 Agile 개발 문화를 선호합니다.</li>
            <li>
              크로스플랫폼 앱 개발에 능숙하며, 이슈 발생 시 주도적으로 해결책을
              모색하고 실행합니다. 또한 항상 최선의 방안을 고민하며 팀과 협력해
              효율적으로 문제를 해결합니다.
            </li>
            <li>
              코드 리뷰와 팀 협업을 통해 지속적으로 코드 품질을 개선하고,
              자동화를 통해 반복적인 작업을 최소화하여 더 가치 있는 개발에
              집중합니다.
            </li>
          </ul>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">GitHub Activity</h2>
        <div className="rounded-md border p-4 sm:p-6 overflow-x-auto">
          <GithubActivity />
        </div>
      </section>
    </main>
  );
}
