import workHistory from "@/data/work_history.json";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { QuoteOpen } from "@gravity-ui/icons";

import LayoutBuilder from "./LayoutBuilder";
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
import { JobItem, LayoutType } from "@/lib/types";
import AchievementsCard from "./AchievementsCard";
import ResponsabilitiesCard from "./ResponsabilitiesCard";
import EmployerCard from "./EmployerCard";
import JobCard from "./JobCard";

export default async function Job({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const jobRequest = workHistory.find((item) => item.id === slug);
  if (!jobRequest) notFound();
  const job = jobRequest as JobItem;

  /* this ('totalAchievementsLength' and 'isLongLayout') dictates wether achievements is too big (this ruins the layout composure and tell the page to restructure from grid to a simple flex-col) */
  // TODO remove this old method
  const totalAchievementsLength = job.achievements.reduce(
    (acc, curr) => acc + curr.length,
    0,
  );
  const isLongLayout = totalAchievementsLength > 600;
  // const isLongLayout = totalAchievementsLength > 300;

  const layout: LayoutType = LayoutBuilder(job);

  return (
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
        // isLongLayout ? "grid" : "flex flex-col",
        // isLongLayout ? "flex flex-col" : "grid grid-cols-2",
        layout.mainLayout,
        // denseLayout
        "",
        "",
        "",
        "",
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
      {/* <div
        // TEMP component wrapper
        className="contents invisible "
      > */}
      <EmployerCard job={job} />
      {/* </div> */}
      <JobCard job={job} JobCardLayout={layout.jobCardLayout} />
      <AchievementsCard job={job} achiCardLayout={layout.achiCardLayout} />
      <ResponsabilitiesCard job={job} respCardLayout={layout.respCardLayout} />

      {/* <div
        // TEMP component wrapper
        className="contents invisible"
      > */}
      <Card
        className={cn(
          "bg-transparent",
          "md:bg-glass-white",
          "shadow-none",
          "md:shadow",
          "md:glass",
          "md:glass-upper",
          "col-start-1",
          "col-span-full",
          // "row-start-6",
          // "md:row-start-5",
          "",
          "",
        )}
      >
        <ImageGallery assets={job.assets} />
      </Card>
      {/* </div> */}
    </main>
  );
}
