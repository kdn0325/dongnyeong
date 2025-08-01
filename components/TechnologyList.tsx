import React from "react";

export default function TechnologyList({
  technologies,
}: {
  technologies: string[];
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Stack</h2>
      <ul className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <li
            key={tech}
            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}
