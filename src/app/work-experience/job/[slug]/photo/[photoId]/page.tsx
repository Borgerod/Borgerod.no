import Carousel from "@/app/components/content.components/Carousel";
import type { JobItem } from "@/lib/types";
import workHistory from "@/data/work_history.json";
import { notFound } from "next/navigation";

export async function generateStaticParams({
  params,
}: {
  params: { slug: string };
}) {
  const job = (workHistory as JobItem[]).find((j) => j.id === params.slug);
  if (!job) return [];

  return job.assets.map((asset) => ({
    photoId: asset.split("/").pop(),
  }));
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ slug: string; photoId: string }>;
}) {
  const { slug, photoId } = await params;

  const job = (workHistory as JobItem[]).find((j) => j.id === slug);
  if (!job) notFound();

  const src = job.assets.find((a) => a.endsWith(photoId));
  if (!src) notFound();

  return (
    <main className="mx-auto max-w-490 p-4">
      <Carousel src={src} assets={job.assets} slug={slug} />
    </main>
  );
}
