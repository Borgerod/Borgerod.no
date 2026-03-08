import { JobItem } from "@/lib/types";
import { Card, Chip, cn } from "@heroui/react";

type JobCardProps = {
  job: JobItem;
  isLongLayout?: boolean;
  JobCardLayout: string;
};

export default function JobCard({
  job,
  isLongLayout,
  JobCardLayout,
}: JobCardProps) {
  return (
    <Card
      id="job-card"
      className={cn(
        "bg-transparent md:bg-glass-white shadow-none md:shadow md:glass md:glass-white w-full h-full p-4",
        JobCardLayout,
        "",
        "",
      )}
    >
      <Card.Header className="w-full">
        <Card.Title className="text-lg flex">
          {job.title}
          <Chip
            size="md"
            variant="soft"
            id={`chip-project-tag ${(job.employer + "-" + job.title).replaceAll(" ", "-")}`}
            className={cn(
              "",
              "",
              job.isProject ? "visible" : "hidden",
              "ml-auto",
              "w-fit",
              "font-medium",
              "bg-glass-green-dark-2",
              "bg-glass-green-base",
              "",
              "",
            )}
          >
            Project
          </Chip>
        </Card.Title>
        <div
          className={cn("text-lg flex flex-col justify-evenly h-40", "", "")}
        >
          <div className="italic">
            <span className={cn("text-secondary block", "", "")}>
              Employer: {job.employer}
            </span>
            <span className={cn("text-secondary block", "", "")}>
              Period: {job.period.start} - {job.period.end}
            </span>
            <span className={cn("text-secondary block", "", "")}>
              Location: {job.location}
            </span>
          </div>
          <div className="">
            <div id="job-core-language-framework">
              <h3 className={cn("font-medium text-secondary", "", "")}>
                Core language/framework:
              </h3>
              <ul className={cn("flex gap-2", "", "")}>
                {job.languages.map((language: string, i: number) => (
                  <li key={i}>
                    <Chip
                      size="sm"
                      variant="soft"
                      id={`chip-core-language-framework-${i}`}
                      className={cn(
                        "font-light px-2 py-0 h-4 w-fit",
                        "bg-glass-gray/50",
                        "select-none",
                        "group-hover:bg-glass-green-base!",
                        "self-center",
                        "",
                        "",
                        "font-normal",
                        "font-medium",
                        "bg-glass-green-dark-2",
                        "bg-glass-green-base",
                        "",
                        "",
                      )}
                    >
                      {language}{" "}
                    </Chip>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={cn(
                "flex flex-col gap-1 text-nowrap text-start font-medium text-secondary",
                "",
                "",
              )}
            >
              <h3>Tools used:</h3>
              <ul className={cn("flex gap-1 flex-wrap pl-2", "", "")}>
                {job.tools.map((tool: string, i: number) => (
                  <Chip
                    size="sm"
                    variant="soft"
                    key={i}
                    id={`chip-tools-${i}`}
                    className={cn(
                      "font-light px-2 py-0 h-4 w-fit",
                      "bg-glass-gray/50",
                      "select-none",
                      "group-hover:bg-glass-green-base!",
                      "self-center",
                      "",
                      "",
                      "font-normal",
                      "font-medium",
                      "bg-glass-gray-2",
                      "bg-glass-gray-undertone",
                      "",
                      "",
                      "",
                    )}
                  >
                    {tool}
                  </Chip>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card.Header>
      <Card.Content className={cn()}>
        <div
          id="job-description"
          className={cn("flex flex-col mt-auto", "", "")}
        >
          <h3 className="text-lg">Job Description</h3>
          {job.description
            .split(/\. |;|:/)
            .map((paragraph: string, i: number) => (
              <p key={i} className={cn("p-2", "", "")}>
                {paragraph}
                {i < job.description.split(/\. |;|:/).length - 1 && "."}
              </p>
            ))}
        </div>
      </Card.Content>
    </Card>
  );
}
