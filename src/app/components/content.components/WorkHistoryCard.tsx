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
    <>
      <Card
        id="word-history"
        className={cn(
          "h-45",
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
          "",
          className,
        )}
        variant="secondary"
      >
        <Card.Header>
          <Card.Title className="md:text-accent-foreground text-primary font-light">
            Work Experience
          </Card.Title>
          <Separator
            variant="secondary"
            className="bg-glass-gray-dark md:bg-glass-white-muted hidden sm:flex"
          />

          <Card.Description></Card.Description>
        </Card.Header>
        <Card.Content
          className={cn(
            "text-xs font-light",
            "grid md:grid-cols-[auto_auto_auto]",
            "grid-cols-[auto_auto_auto]",
            "justify-items-start",
            "gap-x-0",
            "md:gap-0",
            "items-start",
            "content-between",
            "justify-between",
            "",
            "",
          )}
        >
          {workHistory.map((job: jobItem) => (
            <div key={job.id} className="contents">
              <div
                id="date-col"
                className="text-normal md:text-[9px] md:text-accent-foreground/90 text-primary  self-start font-normal md:font-thin text-wrap xl:text-nowrap w-fit sm:mr-2"
              >
                <span className="text-nowrap">{job.period.start}</span>
                <span className="text-nowrap"> -</span>
                <span className="text-nowrap">{job.period.end}</span>
              </div>

              <Card
                id="job-info-col"
                variant="transparent"
                className="text-nowrap overflow-hidden contents gap-0 unset-card w-fit"
              >
                <Link
                  className={cn("contents", "sm:pointer-events-none", "", "")}
                  href={`work-experience/job/${job.id}`}
                >
                  <Card.Header>
                    <Card.Title className="md:text-accent-foreground/90 text-primary font-normal text-xs leading-none sm:text-[13px]">
                      {job.title}
                    </Card.Title>

                    <Card.Description className="md:text-accent-foreground-muted text-primary text-xs text-nowrap flex items-start text-[11px]  ">
                      {job.employer}
                      <span
                        className={cn(
                          job.isProject ? "flex gap-0.5" : "hidden",
                        )}
                      >
                        ,{" "}
                        <Chip
                          size="sm"
                          variant="soft"
                          className={cn(
                            "font-light px-2 py-0 h-4 w-fit",
                            "select-none",
                            "self-center",
                            "",
                            "",
                            "font-medium",
                            "md:font-thin",
                            "md:font-thin",
                            "bg-glass-offwhite",
                            "md:bg-glass-green-base",
                            "text-secondary",
                            "md:text-accent-foreground-muted",
                            "",
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

              <div
                id="description-url-col read-more"
                className="justify-self-end"
              >
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
                      "md:text-[10px]",
                      "text-center",
                      "items-center",
                      "justify-items-center",
                      "flex",
                      "text-shadow-accent-soft-hover",
                      // dekstop
                      "md:bg-glass-green-base md:hover:bg-glass-green-base-hover",
                      "md:text-accent-foreground-muted md:hover:text-accent-foreground",

                      /* 
                      TODO: get feedback and pick option 1 or 2 
                      */

                      /* OPTION 1, bright text dark chips */
                      // "bg-glass-green-base hover:bg-glass-green-base-hover",
                      // "text-accent-foreground-muted hover:text-accent-foreground",

                      /* OPTION 2, dark text bright chips */
                      "bg-glass-offwhite hover:bg-glass-green-base",
                      "text-secondary hover:text-secondary-hover",

                      "",
                      "",
                    )}
                  >
                    <Chip.Label className="flex items-center text-center gap-1 p-0">
                      <span className="block md:hidden lg:block text-nowrap">
                        Read more
                      </span>

                      <LinkIcon className="size-2.5 " />
                    </Chip.Label>
                  </Chip>
                </Link>
              </div>
            </div>
          ))}
        </Card.Content>
      </Card>
    </>
  );
}
