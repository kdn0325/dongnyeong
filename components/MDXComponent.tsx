import * as runtime from "react/jsx-dev-runtime";
import Image from "next/image";
import { Callout } from "./Callout";

/**
 * MDX 문자열 코드를 React 컴포넌트로 변환하는 훅
 * @param code - MDX 코드 문자열
 * @returns React 컴포넌트
 */

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  // runtime 객체를 전달해 React 요소 반환
  return fn({ ...runtime }).default;
};

// MDX에서 사용할 커스텀 컴포넌트 매핑
const components = {
  Image,
  Callout,
};

interface MDXProps {
  code: string;
}
/**
 * MDXContent 컴포넌트
 * MDX 문자열을 받아서 컴포넌트로 렌더링함
 */
export function MDXContent({ code }: MDXProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
