"use client";
import { cn } from "@heroui/react";
import { Card } from "@heroui/react";
import { ComponentBaseProps, GitHubStats, LeetCodeStats } from "@/lib/types";
import StylizedCircle from "../design.components/StylizedCircle";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Stats {
  github: GitHubStats | null;
  leetCode: LeetCodeStats | null;
  loading: boolean;
}

function StatContent({ stats }: { stats: Stats }) {
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
    <div
      className={cn(
        "w-full",
        "gap-x-1",
        "gap-y-3",
        "grid",
        "grid-rows-auto",
        "grid-cols-2",
        "grid-rows-auto",
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

      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          {stats.github.totalContributions}
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          GitHub contributions
        </span>
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          {stats.github.totalRepos}
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Repositories
        </span>
      </div>

      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          {stats.github.yearsExp}+
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Years experience
        </span>
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          {stats.github.yearsExpProf}+
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Years as professional
        </span>
      </div>
      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline ">
          {stats.leetCode.allSubmissions}
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          Leetcode submissions
        </span>
      </div>

      <div className="grid grid-cols-subgrid gap-0 h-fit ">
        <span className="text-xs   leading-none sm:leading-2.5 text-nowrap self-baseline">
          Beats{" "}
          <span className="text-xl font-light text-primary sm:leading-none leading-none text-nowrap self-baseline">
            {stats.leetCode.beatsPercentage}%
          </span>
        </span>
        <span className="text-xs leading-none sm:leading-2.5 ">
          of other participants
        </span>
      </div>
    </div>
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

        /* * grid */
        "grid",
        "grid-rows-auto",
        "grid-rows-1",
        "grid-cols-2",
        "grid-cols-[2fr_1fr]",
        // "h-45",
        // "w-full",


        //> NEW CHANGES 
        // "w-full",
        "md:h-45",

        "",
        "",
        "",
        "",
        className,
      )}
    >
      <StylizedCircle
        className={cn(
          /* * placement */
          "blur-xs",
          "aspect-square",
          "rounded-full",
          "bg-linear-to-br",
          "",
          "opacity-90",

          /* * size */
          "h-4/5",
          "h-2/3",
          "h-3/5",
          "w-fit",

          /* * placement */
          "col-start-2",
          "row-start-1",
          "justify-self-start",
          "self-start",
          "translate-x-1/5",
          "",
          "",
        )}
      />

      <Image
        src="/assets/images/ab_logo_demo.png"
        width={500}
        height={500}
        alt="Picture of the author"
        className={cn(
          /* * style */
          "aspect-square",
          "bg-linear-to-br",
          "opacity-90",

          /* * size */
          "h-2/6",
          "w-fit",

          /* * placement */
          "col-start-2",
          "row-start-1",

          "justify-self-center",
          "self-start",
          "-translate-y-1/8",
          "",
          "",
        )}
      />

      <div
        className={cn(
          "w-full h-full p-0 m-0",
          "col-start-1",
          "row-start-1",
          "col-start-1",
          "col-span-full",
          "row-start-1",
          "row-span-full",
          "grid",
          "h-full",
          "",
        )}
      >
        <StatContent stats={stats} />
      </div>
    </Card>
  );
}
