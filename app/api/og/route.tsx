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
              width={48}
              height={48}
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x={14}
                y={8}
                width={36}
                height={48}
                rx={8}
                ry={8}
                fill="#000"
              />
              <path
                d="M20 32c4-8 8 8 12 0s8 8 12 0"
                stroke="#fff"
                strokeWidth={3}
              />
            </svg>
            <p tw="ml-2 font-bold text-2xl">dongnyeong</p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">
              BLOG POST
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
