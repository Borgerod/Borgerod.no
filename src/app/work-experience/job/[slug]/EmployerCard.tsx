import { JobItem } from "@/lib/types";
import { Card, Separator, Avatar, Label, Description, cn } from "@heroui/react";
import { QuoteOpen } from "@gravity-ui/icons";
import Image from "next/image";
import { Link as Redirect } from "@heroui/react";

export default function EmployerCard({ job }: { job: JobItem }) {
  return (
    <Card
      id="company-card"
      className={cn(
        "bg-transparent md:bg-glass-white shadow-none md:shadow  col-start-1 col-span-full row-start-2 ",
        "mb-0",
        "glass",
      )}
    >
      <Card.Header>
        <Card.Title className="text-lg">Company Profile</Card.Title>
        <Image
          id="company-logo-large company-banner"
          width={500}
          height={500}
          src={job.employer_profile.logo}
          alt={""}
          className={cn(
            "object-cover object-center rounded-2xl aspect-16/4 w-full h-fit ",
            "bg-glass-green-dark-2",
            "p-5",
            "h-full",
            "object-contain",
            "",
            "",
          )}
        />
      </Card.Header>
      <div className="flex flex-row gap-5">
        <Avatar
          id="avatar company-logo-small company-icon"
          size="sm"
          variant="soft"
          className={cn(
            "bg-glass-green-dark-2",
            "place-self-start",
            "h-15 w-15",
            "",
            "",
          )}
        >
          <Avatar.Image
            alt={job.employer_profile + " avatar"}
            src={job.employer_profile.avatar}
            width="64"
            height="64"
            className="object-contain"
          />
          <Avatar.Fallback>{job.employer.charAt(0)}</Avatar.Fallback>
        </Avatar>
        <div className="w-full">
          <Label className="flex w-full">
            {job.employer.replace(/-/g, "")}
            <span
              className={cn(
                "ml-auto font-semibold text-xs text-secondary",
                "",
                "",
              )}
            >
              {job.employer_profile.industry}
            </span>
          </Label>
          <Description className="text-secondary">
            <h3>Company Description:</h3>
            {job.employer_profile.description
              .split("Demonstrates capabilities of:")[0]
              ?.split(/\. |\."/)
              .map((line: string, index: number, array: string[]) =>
                line.includes('"') ? (
                  <p
                    key={`desc-${index}`}
                    id="business-quote"
                    className="p-2 text-lg italic grid grid-cols-[auto_auto_auto] grid-rows-[1fr_3fr] w-fit justify-items-start max-w-xl pb-10"
                  >
                    <QuoteOpen className="row-start-1 row-span-2 col-start-1 col-span-full  self-start m-2 h-20 w-20 text-glass-gray-2" />
                    <span className="row-start-2 row-span-1 col-start-2 col-span-1 ml-10">
                      {line.slice(1) + "."}
                    </span>
                  </p>
                ) : (
                  <p key={`desc-${index}`}>
                    {line}
                    {index < array.length - 1 && "."}
                  </p>
                ),
              )}
            <br />
            <p>
              Website:{" "}
              <Redirect href={job.employer_profile.website} className={""}>
                {job.employer_profile.website}
              </Redirect>
            </p>
          </Description>
        </div>
      </div>
      <Separator variant="tertiary" className="md:hidden" />
    </Card>
  );
}
