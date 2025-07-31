import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Edge 런타임에서 동작하도록 설정
export const runtime = "edge";
// Inter-Bold 폰트를 비동기로 불러오기 (ArrayBuffer 형태)
const interBold = fetch(
  new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    const fontBold = await interBold;
    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");
    // title이 없으면 500 에러 반환
    if (!title) {
      return new Response("제목이 없습니다 ", { status: 500 });
    }
    // 제목 길이 제한
    const heading =
      title.length > 140 ? `${title.substring(0, 140)}...` : title;
    // Open Graph 이미지 생성
    // http://localhost:3000/api/og?title=test
    return new ImageResponse(
      (
        <div tw="flex relative flex-col p-12 w-full h-full items-start text-black bg-white">
          <div tw="flex items-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 200 200"
              fill="none"
              stroke="#ff9800"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="60,115 40,95 60,75" />
              <polyline points="140,115 160,95 140,75" />
              <rect x="70" y="40" width="60" height="120" rx="10" />
              <rect x="90" y="40" width="20" height="5" rx="2" fill="#ff9800" />
              <circle cx="100" cy="140" r="5" fill="#ff9800" stroke="none" />
            </svg>
            <p tw="ml-2 font-bold text-2xl">{siteConfig.author}</p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">
              {siteConfig.description}
            </div>
            <div tw="flex text-[80px] font-bold text-[50px]">{heading}</div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl">{siteConfig.url}</div>
            <div tw="flex items-center text-xl">
              <div tw="flex ml-2">{siteConfig.link.github}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    // TODO: 에러 예외 처리 필요시 추가하기
    // 이미지 생성 실패 시 500 에러 반환
    console.error(error);
    return new Response("이미지를 생성하지 못했습니다", { status: 500 });
  }
}
