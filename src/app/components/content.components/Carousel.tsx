"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";

export default function Carousel({
  src,
  assets,
  slug,
}: {
  src: string;
  assets: string[];
  slug: string;
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(assets.indexOf(src));
  const [direction, setDirection] = useState(0);

  function closeModal() {
    router.push(`/work-experience/job/${slug}`);
  }

  function goNext() {
    setDirection(1);
    const next = currentIndex < assets.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(next);
    const filename = assets[next].split("/").pop();
    router.replace(`/work-experience/job/${slug}/photo/${filename}`, {
      scroll: false,
    });
  }

  function goPrev() {
    setDirection(-1);
    const prev = currentIndex > 0 ? currentIndex - 1 : assets.length - 1;
    setCurrentIndex(prev);
    const filename = assets[prev].split("/").pop();
    router.replace(`/work-experience/job/${slug}/photo/${filename}`, {
      scroll: false,
    });
  }

  useKeypress("Escape", () => closeModal());
  useKeypress("ArrowLeft", () => goPrev());
  useKeypress("ArrowRight", () => goNext());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg">
      <div className="absolute inset-0 cursor-default" onClick={closeModal} />

      <SharedModal
        // src={assets[currentIndex]}
        src={src}
        assets={assets}
        currentIndex={currentIndex}
        direction={direction}
        closeModal={closeModal}
        goNext={goNext}
        goPrev={goPrev}
      />
    </div>
  );
}
