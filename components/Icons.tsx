import React from "react";

type Props = React.HtmlHTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: Props) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 200 200"
      fill="none"
      stroke="#ff9800"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="60,115 40,95 60,75" />
      <polyline points="140,115 160,95 140,75" />
      <rect x="70" y="40" width="60" height="120" rx="10" />
      <rect x="90" y="40" width="20" height="5" rx="2" fill="#ff9800" />
      <circle cx="100" cy="140" r="5" fill="#ff9800" stroke="none" />
    </svg>
  ),
  github: (props: Props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
};
