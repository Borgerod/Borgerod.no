"use client";

import {
  Xmark,
  ArrowUpRightFromSquare,
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
} from "@gravity-ui/icons";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/lib/animationVariants.utils";
import downloadPhoto from "@/lib/downloadPhoto.utils";
import { cn } from "@heroui/styles";

export default function SharedModal({
  src,
  assets,
  currentIndex,
  direction,
  closeModal,
  goNext,
  goPrev,
}: {
  src: string;
  assets: string[];
  currentIndex: number;
  direction: number;
  closeModal: () => void;
  goNext: () => void;
  goPrev: () => void;
}) {
  const handlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    trackMouse: true,
  });

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        id="full screen container"
        className="fixed inset-0 z-50"
        {...handlers}
      >
        <div
          id="image"
          className="relative flex h-full w-full items-center justify-center"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute"
            >
              <Image
                src={src}
                width={1920}
                height={1280}
                priority
                alt="Job image"
                className="max-h-screen object-contain md:p-25 md:py-20 py-20"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          id="left nav — screen edge"
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 rounded-full bg-glass-black-dark p-3 text-accent-foreground-muted backdrop-blur-lg transition hover:bg-glass-gray hover:text-accent-foreground hover:contrast-110"
          onClick={goPrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          id="right nav — screen edge"
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 rounded-full bg-glass-black-dark p-3 text-accent-foreground-muted backdrop-blur-lg transition hover:bg-glass-gray hover:text-accent-foreground hover:contrast-110"
          onClick={goNext}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div
          id="top right corner: close"
          className="absolute top-0 right-0 p-4"
        >
          <button
            onClick={closeModal}
            className="rounded-full bg-glass-black-dark p-3 text-accent-foreground-muted backdrop-blur-lg transition hover:bg-glass-gray hover:text-accent-foreground hover:contrast-110"
          >
            <Xmark className="h-6 w-6" />
          </button>
        </div>

        <div
          id="top left corner: open + download"
          className="absolute top-0 left-0 flex items-center gap-2 p-4"
        >
          <a
            id="button route open-image-button"
            href={src}
            className="rounded-full bg-glass-black-dark p-3 text-accent-foreground-muted backdrop-blur-lg transition hover:bg-glass-gray hover:text-accent-foreground hover:contrast-110"
            target="_blank"
            title="Open fullsize version"
            rel="noreferrer"
          >
            <ArrowUpRightFromSquare className="h-6 w-6" />
          </a>
          <button
            id="download download-button"
            onClick={() =>
              downloadPhoto(src, src.split("/").pop() ?? "photo.jpg")
            }
            className="rounded-full bg-glass-black-dark p-3 text-accent-foreground-muted backdrop-blur-lg transition hover:bg-glass-gray hover:text-accent-foreground hover:contrast-110"
            title="Download"
          >
            <ArrowDownToLine className="h-6 w-6" />
          </button>
        </div>

        <div
          id="bottom center: counter"
          className={cn(
            "absolute",
            "bottom-4",
            "justify-self-center",
            "self-end",
            "rounded-full",
            "bg-glass-black-dark",
            "px-4",
            "py-2",
            "text-sm",
            "text-normal",
            "text-accent-foreground-muted",
            "pointer-events-none",
          )}
        >
          {currentIndex + 1} / {assets.length}
        </div>
      </div>
    </MotionConfig>
  );
}
