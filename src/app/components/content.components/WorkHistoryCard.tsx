import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, Chip, Separator } from "@heroui/react";
import workHistory from "@data/work_history.json";

type jobItem = {
  id: string;
  period: { start: string; end: string };
  title: string;
  employer: string;
  location: string;
  isProject: boolean;
  description: string; //? think about this
};

export default function WorkHistoryCard({ className }: ComponentBaseProps) {
  return (
    <Card
      id="word-history"
      className={cn(
        "self-end",
        "bg-green-base/80",
        "h-45",
        "w-full",
        "bg-radial",
        // "to-green-light/50",
        // "from-green-dark/50",
        "bg-green-base/20",
        "bg-radial-[at_30%_10%] from-green-light-2/50 to-green-dark-2/50 to-75%",

        // "bg-glass-green-base/10",
        // "bg-radial-[at_30%_10%] from-glass-green-light-2/80 to-glass-green-dark-2/80 to-75%",

        "bg-glass-green-base",
        "bg-radial-[at_30%_10%] from-glass-green-light-2 to-glass-green-dark-2 to-75%",

        "backdrop-saturate-80!",

        "text-accent-foreground!",
        className,
      )}
      variant="secondary"
    >
      <Card.Header>
        <Card.Title className="text-accent-foreground font-light">
          Work Experience
        </Card.Title>
        <Separator variant="secondary" className="pb-0" />

        <Card.Description></Card.Description>
      </Card.Header>
      <Card.Content className="text-xs font-light">
        {workHistory.map((job: jobItem) => (
          <div key={job.id} id={job.id}>
            <div>
              {job.period.start} - {job.period.end}
            </div>

            <div>
              <p>{job.title}</p>
              <p>{job.employer}</p>
              <Chip className={cn(job.isProject ? "block" : "hidden")}>
                Project
              </Chip>
            </div>

            <div>{job.description}</div>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}
