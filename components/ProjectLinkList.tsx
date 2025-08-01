import type { ProjectLink } from "@/types";
import React from "react";

export default function ProjectLinkList({ links }: { links: ProjectLink[] }) {
  const getLabel = (type: string) => {
    switch (type) {
      case "repo":
        return "🔗 저장소";
      case "store":
        return "📱 앱스토어";
      default:
        return type;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Link</h2>
      <ul className="space-y-1">
        {links.map(({ url, type }, idx) => (
          <li key={idx}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {getLabel(type)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
