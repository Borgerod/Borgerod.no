import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@heroui/react";
import { Card, Chip, Separator } from "@heroui/react";
import workHistory from "@data/work_history.json";
import Link from "next/link";
import { Link as LinkIcon } from "@gravity-ui/icons";
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
        "bg-green-base/20",
        "bg-radial-[at_30%_10%] from-green-light-2/50 to-green-dark-2/50 to-75%",
        "bg-glass-green-base",
        "bg-radial-[at_30%_10%] from-glass-green-light-2 to-glass-green-dark-2 to-75%",
        "backdrop-saturate-80",
        "text-accent-foreground!",
        //> NEW CHANGES
        "unset-glass",
        "unset-card",
        "bg-none",
        "bg-transparent",
        "backdrop-saturate-100",

        "md:backdrop-saturate-80",
        "md:bg-radial",
        "md:bg-green-base/20",
        "md:bg-radial-[at_30%_10%] from-green-light-2/50 to-green-dark-2/50 to-75%",
        "md:bg-glass-green-base",
        "md:bg-radial-[at_30%_10%] from-glass-green-light-2 to-glass-green-dark-2 to-75%",
        "md:glass",
        "md:glass-green",
        "md:glass-green",
        "border-none!",
        "border-none!",
        "border-transparent!",
        "shadow-none",
        "backdrop-filter-none",
        "border-none",
        "outline-none",
        "outline-transparent!",
        "outline-offset-0",
        "md:card",
        "",
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
      <Card.Content
        className={cn(
          "text-xs font-light",
          "grid md:grid-cols-[auto_1fr_auto]",
          "grid-cols-[auto_auto_auto]",
          "justify-items-start",
          "gap-x-0",
          "md:gap-0",
          "items-start",
          "content-between",
          "",
          "",
        )}
      >
        {workHistory.map((job: jobItem) => (
          <div key={job.id} className="contents">
            <div
              id="date-col"
              className="text-xs text-[9px] self-start font-thin text-wrap xl:text-nowrap w-fit sm:mr-2"
            >
              <span className="text-nowrap">{job.period.start}</span>
              <span className="text-nowrap"> -</span>
              <span className="text-nowrap">{job.period.end}</span>
            </div>

            <Card
              id="job-info-col"
              variant="transparent"
              className="text-nowrap overflow-hidden contents gap-0  p-0 rounded-none"
            >
              <Link
                className={cn("contents", "sm:pointer-events-none", "", "", "")}
                href={`work-experience/job/${job.id}`}
              >
                <Card.Header>
                  <Card.Title className="text-accent-foreground/90 font-normal text-xs leading-none sm:text-[13px]">
                    {job.title}
                  </Card.Title>

                  <Card.Description className="text-accent-foreground-muted text-xs text-nowrap flex items-start text-[11px] flex-wrap">
                    {job.employer}
                    <span className={cn(job.isProject ? "block" : "hidden")}>
                      ,{" "}
                      <Chip
                        size="sm"
                        variant="soft"
                        className={cn(
                          "font-light  w-fit",
                          "bg-glass-green-base",
                          "select-none",
                          "font-thin",
                          "text-accent-foreground-muted",
                          "px-1 py-0 h-4",
                          "px-1 py-0 h-5 leading-none ",
                          "text-[11px]",
                          "",
                        )}
                      >
                        <Chip.Label>Project</Chip.Label>
                      </Chip>
                    </span>
                  </Card.Description>
                </Card.Header>
              </Link>
            </Card>

            <div id="description-url-col read-more" className="">
              <Link href={`work-experience/job/${job.id}`}>
                <Chip
                  size="sm"
                  variant="primary"
                  color="accent"
                  key={job.id}
                  id={`${job.id} read more`}
                  className={cn(
                    "hidden sm:flex items-center justify-center",
                    "h-2 w-fit",
                    "md:px-2 md:py-2.5",
                    "p-2",
                    "py-3",
                    "select-none",
                    "font-light",
                    "bg-glass-green-base hover:bg-glass-green-base-hover",
                    "text-accent-foreground-muted hover:text-accent-foreground",
                    "text-accent-foreground",
                    "text-shadow-accent-soft-hover",
                    "",
                    "",
                  )}
                >
                  <Chip.Label className="flex items-center text-center gap-1 p-0">
                    <span className="hidden lg:block">Read more</span>

                    <LinkIcon className="size-2.5 " />
                  </Chip.Label>
                </Chip>
              </Link>
            </div>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}
