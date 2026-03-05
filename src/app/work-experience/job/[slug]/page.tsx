import workHistory from "@/data/work_history.json";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { notFound } from "next/navigation";

export default async function Job({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = workHistory.find((item) => item.id === slug);
  if (!job) {
    notFound();
  }
  return (
    <main className={cn("p-4", "")}>
      <Card>
        <div className={cn("font-bold text-lg", "")}>{job.title}</div>
        <div className={cn("text-sm", "")}>{job.employer}</div>
        <div className={cn("text-xs", "")}>
          {job.period.start} - {job.period.end}
        </div>
      </Card>
    </main>
  );
}
