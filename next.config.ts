import { build } from "velite";
import type { NextConfig } from "next";
import type { Compiler } from "webpack";

// Velite 빌드를 트리거하는 커스텀 Webpack
class VeliteWebpackPlugin {
  static started = false;

  apply(compiler: Compiler) {
    //  Webpack을 총 3번 실행
    // - 서버용(nodejs 런타임) 1회
    // - 서버용(edge 런타임) 1회
    // - 클라이언트용 1회
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return; // 중복 실행 방지
      VeliteWebpackPlugin.started = true;

      const dev = compiler.options.mode === "development";
      // 개발 환경에서는 watch 모드, 프로덕션에선 clean 후 빌드
      await build({ watch: dev, clean: !dev });
    });
  }
}

const nextConfig: NextConfig = {
  images: {
    domains: ["github.com", "ko.reactjs.org", "nextjs.org"],
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin()); // Webpack 커스텀 플러그인 등록
    return config;
  },
};

export default nextConfig;
