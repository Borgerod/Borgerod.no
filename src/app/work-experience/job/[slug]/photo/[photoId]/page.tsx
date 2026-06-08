// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Card, cn } from "@heroui/react";
// import { Button } from "@heroui/react";

// export default function PhotoPage({ src, selectedIndex }: { src: string, selectedIndex:number }) {
//   // const [selectedIndex, setSelectedIndex] = useState(0);
//   const filename = assets[selectedIndex].split("/").pop();

//   return (

//     <main>
//       <Image
//         src={asset[selectedIndex]}
//         alt={`Preview ${selectedIndex + 1}`}
//         fill
//         className="object-cover hover:brightness-90"
//       />
//     </main>
//   );
// }

import type { JobItem } from "@/lib/types";
import workHistory from "@/data/work_history.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cn } from "@heroui/styles";
import Carousel from "@/app/components/content.components/Carousel";

// export default async function PhotoPage({
//   params,
// }: {
//   params: Promise<{ slug: string; photoId: string }>;
// }) {
//   const { slug, photoId } = await params;

//   const job = (workHistory as JobItem[]).find((j) => j.id === slug);
//   if (!job) notFound();

//   const src = job.assets.find((a) => a.endsWith(photoId));
//   if (!src) notFound();

//   return (
//     <main className=" flex items-center justify-center h-screen w-screen bg-black">
//       <Image
//         src={src}
//         alt={photoId}
//         fill
//         // width={500}
//         // height={500}

//         className={cn(
//           "object-contain",

//           "",
//           "",
//         )}
//       />
//     </main>
//   );
// }

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
      {/* <div>
        {src} | {slug}
        {job.assets}
      </div> */}
      <Carousel src={src} assets={job.assets} slug={slug} />
    </main>
  );
}

// //! DONT DELETE
// import Carousel from "@/app/components/content.components/Carousel";
// import type { JobItem } from "@/lib/types";
// import workHistory from "@/data/work_history.json";
// import { notFound } from "next/navigation";

// export async function generateStaticParams({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const job = (workHistory as JobItem[]).find((j) => j.id === params.slug);
//   if (!job) return [];

//   return job.assets.map((asset) => ({
//     photoId: asset.split("/").pop(),
//   }));
// }

// export default async function PhotoPage({
//   params,
// }: {
//   params: Promise<{ slug: string; photoId: string }>;
// }) {
//   const { slug, photoId } = await params;

//   const job = (workHistory as JobItem[]).find((j) => j.id === slug);
//   if (!job) notFound();

//   const src = job.assets.find((a) => a.endsWith(photoId));
//   if (!src) notFound();

//   return (
//     <main className="mx-auto max-w-490 p-4">
//       <Carousel src={src} assets={job.assets} slug={slug} />
//     </main>
//   );
// }
