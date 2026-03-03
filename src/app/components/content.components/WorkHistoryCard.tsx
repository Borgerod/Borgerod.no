import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, Chip, Separator, Tag, TagGroup } from "@heroui/react";
import workHistory from "@data/work_history.json";
import Link from "next/link";
// import { Link } from "@heroui/react";

// import { ChevronsUpWide } from "@gravity-ui/icons";
// import { ChevronsRight } from "@gravity-ui/icons";
import { ArrowUpRightFromSquare, Link as LinkIcon } from "@gravity-ui/icons";
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
      <Card.Content
        className={cn(
          "text-xs font-light",
          "grid grid-cols-3",
          // "grid grid-cols-[auto_1fr_auto]",
          // "gap-1",
          "grid grid-cols-[auto_auto_auto]",
          // "grid grid-cols-[auto_2fr_1fr]",
          // "auto-cols-auto",
          // "grid-flow-col",
          // "grid-flow-col-dense",

          // "justify-items-between",
          "justify-between",
          "content-between",
          // "gap-0",
          // "xl:gap-2",

          // "justify-evenly",
          // "items-top",
          "",
          "",
        )}
      >
        {workHistory.map((job: jobItem) => (
          // <Card.Content key={job.id} id={job.id} className="text-xs font-light ">
          // <>
          <div key={job.id} className="contents">
            <div
              id="date-col"
              // className="text-xs text-[8px] self-start font-thin text-nowrap"
              // className="text-xs text-[9px] self-start font-thin text-nowrap"
              className="text-xs text-[9px] self-start font-thin text-wrap xl:text-nowrap"
              // className="text-xs text-[10px] self-start font-thin"
            >
              <span className="text-nowrap">{job.period.start}</span>
              <span className="text-nowrap"> -</span>
              <span className="text-nowrap">{job.period.end}</span>
            </div>

            <Card
              id="job-info-col"
              variant="transparent"
              className="text-nowrap overflow-hidden contents gap-0  p-0 rounded-none"
              // className="text-nowrap overflow-visible contents gap-0 "
            >
              <Card.Header>
                {/* <Card.Title className="text-accent-foreground/90 font-normal text-[12px] leading-none"> */}
                <Card.Title className="text-accent-foreground/90 font-normal text-[13px] leading-none">
                  {job.title}
                </Card.Title>
                {/* <Card.Description className="text-accent-foreground/80 text-xs  text-nowrap flex items-end text-[10px] leading-4 "> */}
                {/* <Card.Description className="text-accent-foreground/80 text-xs text-nowrap flex items-start text-[10px] leading-none "> */}
                {/* <Card.Description className="text-accent-foreground/80 text-xs text-nowrap flex items-start text-[10px]  "> */}
                <Card.Description className="text-accent-foreground/80 text-xs text-nowrap flex items-start text-[11px]  ">
                  {job.employer}
                  <span className={cn(job.isProject ? "block" : "hidden")}>
                    ,{" "}
                    <Chip
                      size="sm"
                      variant="soft"
                      className={cn(
                        "font-light  w-fit",
                        "bg-glass-gray/50", //todo custom color!
                        "select-none",
                        "font-thin",
                        "text-accent-foreground/80",
                        // "px-2 py-0 h-4",
                        "px-1 py-0 h-4",
                        "px-1 py-0 h-5 leading-none ",
                        "text-[11px]",
                        // "text-[10px]",
                        "",
                      )}
                    >
                      <Chip.Label>Project</Chip.Label>
                    </Chip>
                  </span>
                </Card.Description>
              </Card.Header>
            </Card>

            <div id="description-url-col read-more">
              <Link href={job.description}>
                <Chip
                  size="sm"
                  variant="primary"
                  color="accent"
                  key={job.id}
                  id={`${job.id} read more`}
                  className={cn(
                    // "font-light px-2 py-0 h-4 w-fit",
                    "font-light  h-4 w-fit",
                    "font-light",
                    " h-2",
                    "text-[10px]",
                    "w-fit",
                    "p-0",
                    "bg-glass-gray/50", //todo custom color!
                    "text-accent-foreground/70",
                    // "text-secondary",
                    // "text-light-gray",
                    // "text-glass-gray-undertone",
                    // "text-gray-undertone/60",
                    "select-none",
                    "text-nowrap",
                    "font-thin!",
                    // "2xl:px-2 ",
                    // "2xl:py-0 ",
                    // "2xl:pr-1",
                    // "2xl:py-2.5",
                    "lg:px-2 ",
                    "lg:py-0 ",
                    "lg:pr-1",
                    "lg:py-2.5",
                    // "lg:p-1",
                    "",
                    "",
                  )}
                >
                  <Chip.Label className="flex items-center gap-1 p-0">
                    <span className="hidden lg:block">Read more</span>
                    {/* <LinkIcon className="size-3 " /> */}
                    <LinkIcon className="size-2.5 " />
                  </Chip.Label>
                </Chip>
              </Link>
            </div>

            {/* <div id="description-url-col read-more">
              <Link href={job.description}>
                <Chip
                  size="sm"
                  variant="primary"
                  color="accent"
                  key={job.id}
                  id={`${job.id} read more`}
                  className={cn(
                    // "font-light px-2 py-0 h-4 w-fit",
                    "font-light  h-4 w-fit",
                    "bg-glass-gray/50", //todo custom color!
                    "text-accent-foreground/70",
                    // "text-secondary",
                    // "text-light-gray",
                    // "text-glass-gray-undertone",
                    // "text-gray-undertone/60",
                    "select-none",
                    "text-nowrap",
                    "font-thin!",
                    "2xl:px-2 ",
                    "2xl:py-0 ",
                    "2xl:pr-1",
                    "2xl:py-2.5",
                    // "lg:p-1",
                    "",
                    "",
                  )}
                >
                  <Chip.Label className="flex items-center gap-1 p-0">
                    <span className="hidden 2xl:block">Read more</span>
                    <LinkIcon className="size-3" />
                  </Chip.Label>
                </Chip>
              </Link>
            </div> */}
          </div>
          // </>
        ))}
      </Card.Content>
    </Card>
  );
}
