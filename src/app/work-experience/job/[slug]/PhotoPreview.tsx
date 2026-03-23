"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, cn } from "@heroui/react";
import { Button } from "@heroui/react";

export default function PhotoPreview({
  assets,
  slug,
}: {
  assets: string[];
  slug: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const filename = assets[selectedIndex].split("/").pop();

  return (
    <Card
      className={cn(
        // "space-y-4",
        // "col-span-full",
        // "h-fit",
        // "w-full",
        // "glass",
        // "glass-white",
        // "m-0",
        // "rounded-xl",
        // "p-2",
        "space-y-4",
        "col-span-full",
        "h-fit",
        "w-full",
        "glass",
        "glass-white",
        "m-0",
      )}
    >
      {/* Main preview — clicking opens carousel */}
      <Link
        href={`/work-experience/job/${slug}/photo/${filename}`}
        className={cn(
          "relative w-full overflow-hidden rounded-lg block",
          "transition-transform duration-200 hover:scale-[1.02]",
          "cursor-pointer aspect-video",
        )}
      >
        <Image
          src={assets[selectedIndex]}
          alt={`Preview ${selectedIndex + 1}`}
          fill
          className="object-cover hover:brightness-90"
        />
        <div
          className={cn(
            "absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1",
            "text-xs text-white font-medium",
          )}
        >
          {selectedIndex + 1} / {assets.length}
        </div>
      </Link>

      {/* Thumbnail strip */}
      <div
        className={cn(
          "flex flex-row gap-4 justify-start overflow-x-auto overflow-y-hidden",
          "h-fit p-2",
        )}
      >
        {assets.map((asset, index) => (
          <Button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "shrink-0",
              "transition-transform duration-200 hover:scale-105",
              "shadow-none! outline-none! ring-0! ring-offset-0! border-0! bg-transparent!",
              "focus:ring-0! focus:shadow-none! focus:border-0! focus:bg-transparent!",
              "hover:ring-0! hover:shadow-none! hover:border-0! hover:bg-transparent!",
              "active:ring-0! active:border-0! focus-visible:ring-0! focus-visible:border-0!",
              "h-32 w-32 aspect-square overflow-hidden rounded-lg relative",
              index === selectedIndex ? "ring-2 ring-white" : "opacity-70",
            )}
          >
            <Image
              src={asset}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </Button>
        ))}
      </div>
    </Card>
  );
}
