import { JobItem } from "@/lib/types";
import { Card, cn } from "@heroui/react";

export default function AchievementsCard({ job }: { job: JobItem }) {
  return (
    <Card className="bg-transparent md:bg-glass-white shadow-none md:shadow md:glass md:glass-white max-w-2xl md:col-start-2 md:row-start-3 col-start-1 row-start-4  col-span-2 md:col-span-1 w-full">
      <p id="achievements" className="">
        <h3 className="text-lg">Achievements</h3>
        <ul id="achievements-list" className="p-2">
          {job.achievements.map((paragraph: string, i: number) => (
            <li
              key={i}
              id="achievement"
              className="p-1 grid grid-cols-[auto_1fr] gap-x-2"
            >
              <span className={cn("col-start-1", `row-start-${i}`)}>-</span>
              <span className={cn("col-start-2", `row-start-${i}`)}>
                {paragraph}
              </span>
            </li>
          ))}
        </ul>
      </p>
    </Card>
  );
}
