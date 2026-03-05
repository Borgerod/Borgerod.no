"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button, Card, cn } from "@heroui/react";
import { ChevronLeft, ChevronRight, Xmark } from "@gravity-ui/icons";
export default function ImageGallery({ assets }: { assets: string[] }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + assets.length) % assets.length),
    [assets.length],
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % assets.length),
    [assets.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <Card variant="transparent">
      <Card.Header className="text-lg">Gallery</Card.Header>
      <Card.Description className="">
        Here are some screenshots from the work I have done:
      </Card.Description>

      <div
        className="relative w-full aspect-video bg-zinc-900 overflow-hidden rounded-xl group cursor-pointer"
        onClick={() => setLightbox(true)}
      >
        <Image
          key={assets[current]}
          src={assets[current]}
          alt=""
          fill
          className="object-cover transition-opacity duration-300 object-top"
          sizes="100vw"
          priority
        />

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-glass-gray-dark text-accent-foreground text-sm px-3 py-1 rounded-full">
          {current + 1}/{assets.length}
        </div>

        <Button
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-glass-gray-dark hover:bg-black/70 text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
        >
          <ChevronLeft />
        </Button>
        <Button
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-glass-gray-dark hover:bg-black/70 text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
        {assets.map((imagePath, i) => (
          <Button
            key={imagePath}
            onClick={() => setCurrent(i)}
            className={cn(
              "relative",
              "shrink-0",
              "w-16",
              "h-16",
              "rounded-lg",
              "overflow-hidden",
              "transition-all",
              i === current
                ? "border border-black opacity-100"
                : // : "opacity-50 hover:opacity-100 brightness-70",
                  "opacity-80 hover:opacity-100 brightness-70",
              // ? "ring-2 ring-glass-green-light opacity-100"
            )}
          >
            <Image
              src={imagePath}
              alt=""
              fill
              className="object-cover"
              sizes="64px"
            />
          </Button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <div
            className={cn(
              "relative",
              "w-full",
              "max-w-5xl",
              "max-h-[90vh]",
              "aspect-video",
              "h-full",
              "mx-4",
              "grid",
              "place-items-center",
              "",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={assets[current]}
              src={assets[current]}
              alt=""
              fill
              className={cn("object-contain", "", "")}
              sizes="100vw"
            />

            <div
              id="counter"
              className={cn(
                "bg-black/60 text-accent-foreground text-sm px-4 py-1.5 rounded-full gap-2 flex",
                "w-fit z-10",
                "self-end",
                "mb-2",
                "",
              )}
            >
              <span>
                {
                  assets[current]
                    .replace("/assets/images/jobs/", "")
                    .split(".")[0]
                }
              </span>
              <span>
                ({current + 1}/{assets.length})
              </span>
            </div>
          </div>

          <Button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-all"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft />
          </Button>
          <Button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-all"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight />
          </Button>

          <Button
            variant="ghost"
            isIconOnly
            className="absolute top-4 right-4 text-accent-foreground/60 hover:text-accent-foreground text-2xl hover:bg-glass-light-gray"
            onClick={() => setLightbox(false)}
          >
            <Xmark />
          </Button>
        </div>
      )}
    </Card>
  );
}
