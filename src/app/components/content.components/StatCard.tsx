"use client";
import { cn } from "@heroui/react";
import { Card } from "@heroui/react";
import { ComponentBaseProps, Stats } from "@/lib/types";
import StylizedCircle from "../design.components/StylizedCircle";
import { useEffect, useState } from "react";
import Image from "next/image";
function StatContent({ stats }: { stats: Stats }) {
  //? this is wierd, why do i have two of these basicly? am i overlooking something?
  if (stats.loading) {
    return (
      <div
        className={cn(
          "w-full",
          "gap-x-1",
          "gap-y-3",
          "grid",
          "grid-rows-auto",
          "grid-cols-2",

          "",
          "",
        )}
      >
        <h3
          className={cn(
            "text-xs",
            "font sm:leading-2.5-normal",
            "col-start-1",
            "col-span-full",
          )}
        >
          MY NUMBERS
        </h3>
        <div className="text-xs leading-none sm:leading-2.5">Loading...</div>
      </div>
    );
  }

  if (!stats.github || !stats.leetCode) {
    return (
      <div
        className={cn(
          "w-full",
          "gap-x-1",
          "gap-y-3",
          "grid",
          "grid-rows-auto",
          "grid-cols-2",
          "",
          "",
        )}
      >
        <h3
          className={cn(
            "text-xs",
            "font sm:leading-2.5-normal",
            "col-start-1",
            "col-span-full",
          )}
        >
          MY NUMBERS
        </h3>
      </div>
    );
  }

  return (
    <>
      <h3
        className={cn(
          "text-xs",
          "font sm:leading-2.5-normal",
          "col-start-1",
          "col-span-full",
        )}
      >
        MY NUMBERS
      </h3>

      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary! sm:leading-none leading-none text-nowrap self-baseline ">
          {stats.github.totalContributions}
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          GitHub contributions
        </span>
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary! sm:leading-none leading-none text-nowrap self-baseline ">
          {stats.github.totalRepos}
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Repositories
        </span>
      </div>

      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary! sm:leading-none leading-none text-nowrap self-baseline ">
          {stats.github.yearsExp}+
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Years experience
        </span>
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary! sm:leading-none leading-none text-nowrap self-baseline ">
          {stats.github.yearsExpProf}+
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Years as professional
        </span>
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary! sm:leading-none leading-none text-nowrap self-baseline ">
          {stats.leetCode.allSubmissions}
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Leetcode submissions
        </span>
      </div>

      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xs items-baseline leading-none sm:leading-2.5 text-nowrap self-baseline">
          Beats{" "}
          <span className="text-xl text-wrapfont-light text-primary! sm:leading-none leading-none text-nowrap self-baseline">
            {/* dont like this but oh well */}
            {window.innerWidth < 430
              ? Math.round(stats.leetCode.beatsPercentage)
              : stats.leetCode.beatsPercentage}
            %
          </span>
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          of other participants
        </span>
      </div>
    </>
  );
}

export default function StatCard({ className }: ComponentBaseProps) {
  const [stats, setStats] = useState<Stats>({
    github: null,
    leetCode: null,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [githubRes, leetCodeRes] = await Promise.all([
          fetch("/api/github-stats"),
          fetch("/api/leetcode-stats"),
        ]);

        const github = await githubRes.json();
        const leetCode = await leetCodeRes.json();

        setStats({
          github,
          leetCode,
          loading: false,
        });
      } catch {
        setStats({
          github: null,
          leetCode: null,
          loading: false,
        });
      }
    };

    fetchStats();
  }, []);
  return (
    <>
      <Card
        id="stats-card"
        className={cn(
          /* * style */
          "bg-transparent",
          "text-secondary",
          "font-light",
          "p-0",
          "pt-2",
          "shadow-none",
          "rounded-none",
          "font-light",
          "overflow-clip",
          "h-fit",
          "w-full",
          "h-full",
          "min-h-0",
          "min-h-45",

          /* * grid */
          "grid",
          "grid-rows-auto",
          "grid-rows-1",
          "grid-cols-2",
          "grid-cols-[2fr_1fr]",
          "bg-cover",
          "rounded-t-2xl",
          "text-primary",
          "sm:text-secondary",
          className,
          "",
          "",
        )}
      >
        <StylizedCircle
          className={cn(
            /* * placement */
            "blur-xs",
            "aspect-square",
            "rounded-full",
            "bg-linear-to-br",
            "opacity-90",

            /* * size */
            "h-3/5",
            "w-fit",

            /* * placement */
            "col-start-2",
            "row-start-1",
            "justify-self-end",
            "self-start",
            "absolute",
            "right-0",
            "-right-5",
            "sm:-right-5",
            "md:-right-5",
            "-top-2",
            "max-h-20",
            "sm:max-h-18",
            "lg:max-h-none",
            "",
            "",
          )}
        />

        <Image
          src="/assets/images/ab_logo_demo.png"
          width={427}
          height={387}
          alt="Borgerod logo"
          className={cn(
            "bg-linear-to-br opacity-90",
            "h-full max-h-15 max-w-15",
            "bg-linear-to-br opacity-90 object-contain aspect-427/387",
            "col-start-2 row-start-1",
            "justify-self-center self-start",
            "absolute right-2 sm:right-5 -top-2",
            "",
            "",
          )}
        />

        <div
          className={cn(
            "w-full",
            "h-full",
            "gap-x-1",
            "gap-y-3",
            "grid",
            "grid-rows-auto",
            "grid-cols-2",
            "grid-rows-auto",
            "row-span-full",
            "col-span-full",
            "",
            "",
          )}
        >
          <StatContent stats={stats} />
        </div>
      </Card>
    </>
  );
}
