import workHistory from "@/data/work_history.json";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Description,
  Label,
  Separator,
} from "@heroui/react";
import { Link as Redirect } from "@heroui/react";
import ImageGallery from "./imageGallery";
import Link from "next/link";
import Image from "next/image";

export default async function Job({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = workHistory.find((item) => item.id === slug);
  if (!job) notFound();

  return (
    // <main className={cn("p-0", "md:p-20", "md:px-1")}>
    <main
      className={cn(
        "p-4",
        "md:p-20",
        "py-20",
        "md:px-1",
        "px-0",
        "grid grid-cols-2",
        "gap-5 max-w-4xl",
        "md:bg-transparent",
        "bg-glass-white",
      )}
    >
      <Link className="contents" href="/">
        <Button
          variant="ghost"
          className={cn(
            "absolute",
            "top-5 left-5 z-10",
            "h-12 w-12",
            "hover:bg-glass-green-base",
            "p-2",
          )}
        >
          <Image
            src="/assets/images/ab_logo_demo.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className={cn("size-full")}
          />
        </Button>
      </Link>

      <div className="col-start-1 col-span-full row-start-1">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item>work-experience</Breadcrumbs.Item>
          <Breadcrumbs.Item>job</Breadcrumbs.Item>
          <Breadcrumbs.Item>{slug}</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
      <Card
        id="company-card"
        // className="bg-glass-green-base rounded-none md:bg-glass-white shadow-none md:shadow md:glass md:glass-upper col-start-1 col-span-full row-start-2 "
        className="bg-transparent md:bg-glass-white shadow-none md:shadow md:glass md:glass-upper col-start-1 col-span-full row-start-2 "
      >
        <Separator variant="tertiary" className="md:hidden" />
        <Card.Header>
          <Card.Title className="text-lg">Company Profile</Card.Title>
          <Image
            width={500}
            height={500}
            src={job.employer_profile.logo}
            alt={""}
            className="object-cover object-center rounded-2xl aspect-16/4 w-full h-fit"
            // className="object-cover object-center rounded-2xl aspect-video w-full  h-20 "
          ></Image>
        </Card.Header>
        <div className="flex flex-row gap-5">
          <Avatar
            size="sm"
            variant="soft"
            className={cn(
              "bg-glass-green-dark-2",
              "place-self-start",
              "h-15 w-15",
            )}
          >
            <Avatar.Image
              alt={job.employer_profile + " avatar"}
              src={job.employer_profile.avatar}
              width="64"
              height="64"
              className="object-contain"
              // className="object-contain px-2 py-2.5"
            />

            <Avatar.Fallback>{job.employer.charAt(0)}</Avatar.Fallback>
          </Avatar>
          <div className="w-full">
            <Label className="flex w-full">
              {job.employer.replace(/-/g, "")}

              <span
                className={cn("ml-auto font-semibold text-xs text-secondary")}
              >
                {job.employer_profile.industry}
              </span>
            </Label>

            <Description className="text-secondary">
              <h3>Company Description:</h3>
              {job.employer_profile.description
                .split("Demonstrates capabilities of:")[0]
                ?.split(". ")
                .map((line: string, index: number, array: string[]) => (
                  <p key={`desc-${index}`}>
                    {line}
                    {index < array.length - 1 && "."}
                  </p>
                ))}
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

      <Card
        className={cn(
          "bg-transparent",
          "shadow-none",
          "md:bg-glass-white",
          "md:shadow",

          "md:glass",
          "md:glass-white",
          "w-fit",
          "flex",
          "flex-0",
          "max-w-2xl",
          "min-w-sm",
          "rounded-none",
          "md:rounded-3xl",
          "justify-between",
          // "pt-24",
          // "md:pt-4",
          "pt-4",

          "col-start-1",
          "col-span-2",
          "row-start-3",
          "row-span-1",

          "md:col-span-1",
          "md:col-start-1",
          "md:row-start-3",
          "md:row-span-2",
        )}
      >
        <Card.Title className="text-lg">{job.title}</Card.Title>

        <div>
          <p className={cn("text-secondary")}>Employer: {job.employer}</p>
          <p className={cn("text-secondary")}>
            Period: {job.period.start} - {job.period.end}
          </p>
          <p className={cn("text-secondary")}>Location: {job.location}</p>
          <p id="job-core">
            <ul className="font-semibold text-md flex gap-2">
              <h3>Core language/framework:</h3>{" "}
              {job.languages.map((language: string, i: number) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
          </p>

          <p className="flex gap-1">
            <h3>Tools used:</h3>
            <ul className="flex gap-1 flex-wrap">
              {job.tools.map((tool: string, i: number) => (
                <Chip
                  size="sm"
                  variant="soft"
                  key={i}
                  id={`chip-${i} ${job}`}
                  className={cn(
                    "font-light px-2 py-0 h-4 w-fit",
                    "bg-glass-gray/50", //todo custom color!
                    "select-none",
                    "group-hover:bg-glass-green-base!",
                    "self-center",
                  )}
                >
                  {tool}
                </Chip>
              ))}
            </ul>
          </p>
        </div>
        <p id="job-description" className="flex flex-col">
          <h3 className="text-lg">Job Description</h3>
          {job.description
            .split(/\. |;|:/)
            .map((paragraph: string, i: number) => (
              <p key={i}>
                {
                  // paragraph.includes(":")
                  //   ? (() => {
                  //       const [label, items] = paragraph.split(":");
                  //       return (
                  //         <>
                  //           <span>{label}:</span>
                  //           <ul className="mb-2 p-5">
                  //             {items.split(",").map((item: string, j: number) => (
                  //               <li key={j}> - {item.trim()}</li>
                  //             ))}
                  //           </ul>
                  //         </>
                  //       );
                  //     })()
                  //   : paragraph.includes(".")
                  // ? paragraph
                  // :
                  paragraph + "."
                }{" "}
              </p>
            ))}
        </p>

        {/* <p id="achievements" className="flex flex-col">
          <h3 className="text-lg">Achievements</h3>
          <ul>
            {job.achievements.map((paragraph: string, i: number) => (
              <li key={i}>- {paragraph} </li>
            ))}
          </ul>
        </p> */}
        {/* <p id="responsibilities" className="flex flex-col">
          <h3 className="text-lg">Responsibilities</h3>
          <ul>
            {job.responsibilities.map((paragraph: string, i: number) => (
              <li key={i}>- {paragraph} </li>
            ))}
          </ul>
        </p> */}

        <p></p>
      </Card>
      <Card className="bg-transparent md:bg-glass-white shadow-none md:shadow md:glass md:glass-white w-fit max-w-2xl md:col-start-2 md:row-start-3 col-start-1 row-start-4  col-span-2 md:col-span-1">
        <p id="achievements" className="">
          <h3 className="text-lg">Achievements</h3>
          <ul>
            {job.achievements.map((paragraph: string, i: number) => (
              <li key={i}>- {paragraph} </li>
            ))}
          </ul>
        </p>
      </Card>

      <Card className="bg-transparent md:bg-glass-white shadow-none md:shadow md:glass md:glass-white w-fit max-w-2xl md:col-start-2 md:row-start-4 col-start-1 row-start-5 col-span-2 md:col-span-1">
        <p id="responsibilities" className="">
          <h3 className="text-lg">Responsibilities</h3>
          <ul>
            {job.responsibilities.map((paragraph: string, i: number) => (
              <li key={i}>- {paragraph} </li>
            ))}
          </ul>
        </p>
      </Card>
      <Card className="bg-transparent md:bg-glass-white shadow-none md:shadow md:glass md:glass-upper col-start-1 col-span-full row-start-6 md:row-start-5">
        <ImageGallery assets={job.assets} />
      </Card>
    </main>
  );
}
