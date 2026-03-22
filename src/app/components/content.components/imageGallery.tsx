"use client";

import { Modal, Button, Card } from "@heroui/react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { cn } from "@heroui/react";
import { ChevronLeft, ChevronRight, Xmark } from "@gravity-ui/icons";

//! BUG (4.0): opening images does not work on mobile
// TODO: (4.0) fix Images wont open on mobile mode (maybe other popups?)

//! BUG (3.0): ImageGallery and other popups sometimes becomes unclosable
// TODO: BUG (3.0) fix bug in ImageGallery where image view sometimes refuses to close.

export default function ImageGallery({ assets }: { assets: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const isModalOpenRef = useRef(isModalOpen);

  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  const handlePrevious = useCallback((): void => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : assets.length - 1));
  }, [assets.length]);

  const handleNext = useCallback((): void => {
    setSelectedIndex((prev) => (prev < assets.length - 1 ? prev + 1 : 0));
  }, [assets.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!isModalOpenRef.current) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setIsModalOpen(false);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  const handleTouchStart = (e: React.TouchEvent): void => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent): void => {
    if (touchStart === null) return;

    const distance = touchStart - e.changedTouches[0].clientX;
    const isLeftSwipe = distance > 75;
    const isRightSwipe = distance < -75;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  if (!assets || assets.length === 0) {
    return null;
  }

  return (
    <Card
      id="image-gallery"
      className={cn(
        "space-y-4",
        "col-span-full",
        "h-fit",
        "w-full",
        "glass",
        "glass-white",
        "m-0",
      )}
    >
      <Button
        id="image-preview"
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "relative w-full overflow-hidden rounded-lg",
          "transition-transform duration-200 hover:scale-[1.02]",
          "cursor-pointer group",
          "shadow-none! outline-none! ring-0! ring-offset-0! border-0! bg-transparent!",
          "focus:ring-0! focus:shadow-none! focus:border-0! focus:bg-transparent! hover:ring-0! hover:shadow-none! hover:border-0! hover:bg-transparent!",
          "active:ring-0! active:border-0! focus-visible:ring-0! focus-visible:border-0!",
          "h-fit",
          "aspect-video",
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={assets[selectedIndex]}
          alt={`Preview ${selectedIndex + 1}`}
          fill
          className={cn(
            "object-cover group-hover:brightness-90 hover:border-none active:border-none border-none outline-none hover:outline-none active:outline-none focus-visible:ring-0 transition-all",
            "focus:ring-transparent",
            "focus-within:ring-transparent",
            "focus-visible:ring-transparent",
            "ring-transparent! ring-0! shadow-none! border-none!",
          )}
        />
        <div
          id="image-counter"
          className={cn(
            "absolute bottom-3 right-3 rounded-full bg-glass-black-dark px-3 py-1",
            "text-xs text-accent-foreground font-medium",
          )}
        >
          {selectedIndex + 1} / {assets.length}
        </div>
      </Button>

      <div
        id="image-gallery-thumbnails"
        className={cn(
          "flex flex-row gap-4 justify-start overflow-x-auto overflow-y-hidden",
          "h-fit",
          "p-2",
        )}
      >
        {assets.map((asset: string, index: number) => (
          <Button
            id={`thumbnail-${index}`}
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "shrink-0",
              "transition-transform duration-200 hover:scale-105",
              "shadow-none! outline-none! ring-0! ring-offset-0! border-0! bg-transparent!",
              "focus:ring-0! focus:shadow-none! focus:border-0! focus:bg-transparent! hover:ring-0! hover:shadow-none! hover:border-0! hover:bg-transparent!",
              "active:ring-0! active:border-0! focus-visible:ring-0! focus-visible:border-0!",
              "h-32 w-32 aspect-square overflow-hidden rounded-lg",
            )}
          >
            <Image
              src={asset}
              alt={`Gallery thumbnail ${index + 1}`}
              fill
              className={cn("object-cover h-32 w-32")}
            />
          </Button>
        ))}
      </div>

      <Modal.Backdrop
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        className={cn("bg-glass-black-dark", "backdrop-blur-md")}
      >
        <Modal.Container
          size="lg"
          className={cn("flex items-center justify-center")}
        >
          <Modal.Dialog
            id="image-gallery-modal-content"
            className={cn(
              // POSITION
              "absolute",

              // STYLE
              "md:p-5",
              "px-0",
              "p-0",
              "m-0",
              "h-screen",
              "w-screen",
              "max-w-full",
              "bg-glass-black-dark/80",
              "rounded-none",

              // GRID
              "grid",
              "grid-cols-[auto_1fr_auto]",
              "grid-rows-[auto_1fr_auto]",
              "items-center",
              "gap-5",
            )}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {({ close }: { close: () => void }) => (
              <>
                <div
                  className="absolute inset-0 cursor-default"
                  onClick={close}
                />

                <Button
                  id="image-gallery-modal-close"
                  isIconOnly
                  onClick={close}
                  className={cn(
                    // POSITION
                    "col-start-3",
                    "row-start-1",
                    "justify-self-end",
                    "self-start",

                    // STYLE
                    "bg-glass-black-dark",
                    "hover:bg-glass-gray",
                    "text-accent-foreground-muted",
                    "hover:text-accent-foreground",
                    "hover:contrast-110",

                    "md:m-0",
                    "mr-3",
                    "mt-3",
                  )}
                >
                  <Xmark />
                </Button>

                <Image
                  id="modal-image-view"
                  src={assets[selectedIndex]}
                  alt={`Full view ${selectedIndex + 1}`}
                  width={1920}
                  height={1080}
                  className={cn(
                    //> NEW
                    // POSITION
                    "md:col-start-2",
                    "md:row-start-1",
                    "md:row-span-3",
                    "md:col-span-1",
                    "justify-self-center",
                    "self-center",

                    // STYLE
                    "max-h-full",
                    "max-w-full",
                    "w-auto",
                    "h-full",
                    "object-contain",
                    "rounded-lg",
                    "pointer-events-none",

                    // MOBILE
                    "col-start-1",
                    "col-span-3",
                    "row-start-1",
                    "row-span-3",
                  )}
                />

                <div
                  id="modal-image-counter"
                  className={cn(
                    // POSITION
                    "col-start-2",
                    "row-start-3",
                    "justify-self-center",
                    "self-end",
                    "mb-5",

                    // STYLE
                    "rounded-full bg-glass-black-dark px-4 py-2 text-sm text-accent-foreground",
                    "pointer-events-none",
                  )}
                >
                  {selectedIndex + 1} / {assets.length}
                </div>

                {assets.length > 1 && (
                  <>
                    <Button
                      id="image-gallery-prev prev-button"
                      type="button"
                      isIconOnly
                      onClick={handlePrevious}
                      className={cn(
                        // POSITION
                        "col-start-1",
                        "row-start-2",
                        "justify-self-start",
                        "self-center",
                        "ml-2",

                        // STYLE
                        "bg-glass-black-dark",
                        "hover:bg-glass-gray",
                        "text-accent-foreground-muted",
                        "hover:text-accent-foreground",
                        "hover:contrast-110",
                      )}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <Button
                      id="image-gallery-next next-button"
                      isIconOnly
                      onClick={handleNext}
                      className={cn(
                        // POSITION
                        "col-start-3",
                        "row-start-2",
                        "justify-self-end",
                        "self-center",
                        "mr-2",

                        // STYLE
                        "bg-glass-black-dark",
                        "hover:bg-glass-gray",
                        "text-accent-foreground-muted",
                        "hover:text-accent-foreground",
                        "hover:contrast-110",
                      )}
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Card>
  );
}
