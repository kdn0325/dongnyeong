"use client";

import { useTheme } from "next-themes";
import GitHubCalendar from "react-github-calendar";

const GithubActivity = () => {
  const { resolvedTheme } = useTheme();

  const colorTheme = {
    light: ["#e3f2fd", "#90caf9", "#42a5f5", "#1e88e5", "#1565c0"],
    dark: ["#ffe0b2", "#ffb74d", "#ffa726", "#fb8c00", "#ff9800"],
  };

  return (
    <div className="w-full overflow-x-auto">
      <GitHubCalendar
        username="kdn0325"
        blockSize={15}
        blockMargin={5}
        theme={{
          light: colorTheme.light,
          dark: colorTheme.dark,
        }}
        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
        fontSize={16}
      />
    </div>
  );
};

export default GithubActivity;
