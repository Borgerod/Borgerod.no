import workHistory from "@/data/work_history.json";
import LayoutBuilder from "./LayoutBuilder";
import ImageGallery from "../../../components/content.components/ImageGallery";
import Link from "next/link";
import Image from "next/image";
import AchievementsCard from "./AchievementsCard";
import ResponsabilitiesCard from "./ResponsabilitiesCard";
import EmployerCard from "./EmployerCard";
import JobCard from "./JobCard";
import { notFound } from "next/navigation";
import { cn } from "@heroui/react";
import { Breadcrumbs, Button } from "@heroui/react";
import { JobItem, LayoutType } from "@/lib/types";

export default async function Job({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const job = workHistory.find((item) => item.id === slug);
  if (!job) notFound();
  const layout: LayoutType = LayoutBuilder(job as JobItem);

  return (
    <main
      className={cn(
        "p-4",
        "md:pb-0",
        "md:p-20",
        "py-20",
        "md:px-1",
        "px-0",
        "pb-40",
        "md:max-w-4xl",
        "max-w-full",
        "md:bg-transparent",
        "bg-glass-white",
        "h-fit",
        "max-h-fit",
        "h-full",
        "w-full max-w-full overflow-x-hidden",
        layout.mainLayout,
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

      <EmployerCard job={job} />
      <JobCard job={job} JobCardLayout={layout.jobCardLayout} />
      <AchievementsCard job={job} achiCardLayout={layout.achiCardLayout} />
      <ResponsabilitiesCard job={job} respCardLayout={layout.respCardLayout} />
      <ImageGallery assets={job.assets} />
    </main>
  );
}
