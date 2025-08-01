import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  image_src: string;
  image_placeholder: string;
  title: string;
  description: string;
  team_project: boolean;
  type: "app" | "openSource";
};

export default function ProjectCard({
  id,
  image_src,
  type,
  title,
  description,
  image_placeholder,
  team_project,
}: Props) {
  const isOpenSource = type === "openSource";

  return (
    <li className="w-full min-w-0 ">
      <div className="flex flex-col items-center p-10 text-[var(--txt)] ">
        <Link href={`/project/${encodeURIComponent(title)}`} className="w-full">
          <div className="bg-[#1565c0] dark:bg-[#ff9800] sm:w-auto text-white text-center text-xs font-semibold p-1 rounded mb-8 inline-block leading-none">
            {team_project ? "Team" : "Personal"}
          </div>
          {isOpenSource ? (
            <div className="w-[300px] h-[330px] mx-auto transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_4px_4px_5px_var(--card-shadow)]">
              <Image
                alt={title}
                src={image_src}
                width={300}
                height={300}
                style={{ objectFit: "contain", width: "300px", height: "auto" }}
                placeholder={image_placeholder ? "blur" : undefined}
                blurDataURL={image_placeholder}
                priority
              />
            </div>
          ) : (
            <div className="relative w-full max-w-[600px] mx-auto aspect-[1/2] transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_4px_4px_5px_var(--card-shadow)]">
              <Image
                alt={title}
                src={image_src}
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 700px, 900px"
                fill
                priority
              />
            </div>
          )}
        </Link>

        <div className="flex-1 w-full pt-5">
          <h3 className="mb-3 text-center text-xl text-[var(--txt)] ">
            {title}
          </h3>
          <p className="text-justify text-[var(--txt)] ">{description}</p>
        </div>
      </div>
    </li>
  );
}
