import Image from "next/image";
import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";

export default function CropTest() {
  return (
    <div
      className={cn(
        "h-100",
        "w-100",
        "overflow-hidden",
        "rounded-b-full",
        "",
        "",
      )}
    >
      <Image
        id="profile-image avatar"
        className={cn("h-full", "w-full", "", "")}
        width={400}
        height={400}
        src="/assets/images/profilePictureSquare.png"
        alt="profile picture avatar"
      />
    </div>
  );
}
