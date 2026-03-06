import { JobItem } from "@/lib/types";
import { Card, cn } from "@heroui/react";

export default function ResponsabilitiesCard({ job }: { job: JobItem }) {
  return (
    <Card className="bg-transparent md:bg-glass-white shadow-none md:shadow md:glass md:glass-white max-w-2xl md:col-start-2 md:row-start-4 col-start-1 row-start-5 col-span-2 md:col-span-1 w-full">
      <p id="responsibilities" className="">
        <h3 className="text-lg">Responsibilities</h3>
        <ul id="responsibilities-list" className="p-2 ">
          {job.responsibilities.map((paragraph: string, i: number) => (
            <li
              key={i}
              id="responsibility"
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
