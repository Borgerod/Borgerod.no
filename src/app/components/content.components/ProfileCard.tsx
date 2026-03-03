"use client";
import Image from "next/image";
import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button, Card } from "@heroui/react";
import { ChevronDownWide } from "@gravity-ui/icons";

import { ChevronDown } from "@gravity-ui/icons";
import { Accordion } from "@heroui/react";

import { Handset, Envelope } from "@gravity-ui/icons";
import type { Key } from "@heroui/react";
import {
  ChevronsDown,
  CircleChevronDown,
  Minus,
  Plus,
} from "@gravity-ui/icons";
// import {Accordion} from "@heroui/react";
import React from "react";

export default function ProfileCard({ className }: ComponentBaseProps) {
  /* used by: profile-image-masking */
  const circleDiameter = 60;
  const circleRadius = Math.round(circleDiameter / 2);
  const rectangleHeight = Math.round((circleDiameter * 2) / 3);
  const rectangleWidth = Math.round((((circleDiameter * 16) / 9) * 2) / 3);

  const [expandedKeys, setExpandedKeys] = React.useState<Set<Key>>(
    new Set([""]),
  );

  return (
    <>
      <Card
        id="profile-card"
        className={cn(
          "glass",
          "glass-pure-white",
          "glass-upper",
          "-left-10",
          "w-[calc(100%+2.5rem)]",
          "w-[calc(100%+3rem)]",
          // "w-[calc(100%+5rem)]",
          "flex",
          "flex-col",
          // "items-center",
          // "justify-center",
          "justify-between",
          // "justify-items-between",
          // "content-between",
          "gap-1",
          // "md:gap-5",
          // "2xl:gap-5",
          "2xl:gap-2",
          "",
          "",
          className,
        )}
      >
        <div
          id="profile-image-row"
          className={cn(
            "w-full",
            "flex-1",
            "min-h-0",
            "flex",
            "justify-center",
            "items-center",
            "overflow-hidden",
            //> new
            // "min-h-40",
            "min-h-fit",
            "max-h-50",
            "",
            "",
          )}
        >
          <svg
            id="profile-image"
            className={cn(
              "w-full",
              "h-auto",
              "max-w-full",
              "max-h-full",
              "aspect-square",
              // "max-h-60",
              "max-h-50",
              "",
              "",
            )}
            viewBox={`0 0 ${rectangleWidth} ${rectangleWidth}`}
          >
            <defs>
              <mask id="profile-image-mask-group" className="mask-type-alpha">
                <rect
                  // top-part: this is the exclution layer that keeps the head peaking out
                  x={0}
                  y={0}
                  width={rectangleWidth}
                  height={rectangleHeight}
                  fill="white"
                />
                <circle
                  // bottom-part: this is the actual masking layer that masks the circle shape of the image.
                  cx={rectangleWidth / 2}
                  cy={rectangleWidth - circleRadius}
                  r={circleRadius}
                  fill="white"
                />
              </mask>
            </defs>
            <circle
              // background: this is the background and the "visual container" of the image, that the head is peaking out of.
              cx={rectangleWidth / 2}
              cy={rectangleWidth - circleRadius}
              r={circleRadius}
              className="fill-glass-gray-undertone"
            />

            <image
              href="/assets/images/profilePictureSquare.png"
              width={rectangleWidth}
              height={rectangleWidth}
              mask="url(#profile-image-mask-group)"
            />
          </svg>
        </div>

        <div
          id="bio-row"
          className={cn(
            "col-start-",
            "col-span-",
            "row-start-2",
            "row-span-1",
            "overflow-hidden",
            "text-xs",
            "h-fit",
            // "h-full",
          )}
        >
          {/* <h1 className="text-md 2xl:text-lg">ALEKSANDER BORGERØD</h1> */}
          {/* <h1 className="text-[12px] xl:text-md 2xl:text-lg"> */}
          {/* <h1 className=" xl:text-md 2xl:text-lg">ALEKSANDER BORGERØD</h1> */}
          {/* <h1 className="text-md xl:text-[15px] 2xl:text-lg"> */}
          <h1 className="text-md md:text-[14px] 2xl:text-lg">
            ALEKSANDER BORGERØD
          </h1>
          <h2 className="text-xs  font-light text-green-dark">
            {/* <h2 className="text-xs 2xl:text-sm font-light text-green-dark"> */}
            {/* Fullstackutvikler og økonom  */}
            {/* Full-Stack Developer & Business Professional */}
            Full-Stack Developer | Business Admin.
            {/* Full-Stack Developer | Business pro. */}
            {/* Full-Stack Developer | BBA */}
          </h2>

          <br />
          <p className="font-light">
            With a broad knowledge within
            <span className="font-medium text-green-dark">
              {" "}
              development
            </span>{" "}
            and
            <span className="font-medium text-green-dark"> business</span>, that
            stretches over statistics, marketing and design; makes me the
            perfect fit for your company.
            <br />
            <br />A{" "}
            <span className="font-medium text-green-dark">diligent</span> worker
            that strives for flourishing profit margins,
            <span className="font-medium text-green-dark"> ambitious </span>
            to climb your corporate ladder. As an aspiring family man, I seek
            the stability of a long term employment.
            <br />
            <br />
          </p>
          {/* <p className="tracking-wide italic font-light text-green-dark"> */}
          <p className="tracking-wide font-light text-green-dark">
            So, with{" "}
            <span className="font-medium text-green-dark">good solutions</span>{" "}
            and{" "}
            <span className="font-medium text-green-dark">driven vigor</span>, I
            am confident that I am the one you are looking for.
          </p>

          {/* <Accordion
            className="w-full max-w-md hover:bg-transparent!"
            expandedKeys={expandedKeys}
            variant="default"
            onExpandedChange={setExpandedKeys}
          >
            <Accordion.Item
              id="bio"
              key={1}
              className=" hover:bg-transparent! bg:_"
            >
              <Accordion.Heading className=" hover:bg-transparent!">
                <Accordion.Trigger className=" hover:bg-transparent!">
                  Using Plus/Minus Icon
                  <Accordion.Indicator className=" hover:bg-transparent!">
                    {expandedKeys.has("bio") ? <Minus /> : <Plus />}
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel className=" hover:bg-transparent!">
                <Accordion.Body className=" hover:bg-transparent!">
                  This accordion uses a plus icon that transforms when expanded.
                  The icon automatically rotates 45 degrees to form an X.
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion> */}
        </div>

        <div
          id="contact-buttons-row"
          className={cn(
            "flex",
            "gap-2",
            "h-full",
            "h-10",
            // "h-fit0it",
            "h-fit",
            // "overflow-hidden",
            "overflow-visible",
            "col-start-",
            "col-span-",
            "row-start-3",
            "row-span-1",
            "xl:w-full",
            "w-full",
            "justify-end",
            "xl:justify-between",
          )}
        >
          {/* <Button size="sm"> Hello </Button>
          <Button size="md"> Hello </Button>
          <Button size="lg"> Hello </Button> */}

          <Button
            // size="lg"
            // size="md"
            // size="sm"
            isIconOnly
            className={cn(
              "",
              "bg-glass-gray-dark",
              // "text-white",
              "text-accent-foreground", //*due to the thin weight, the color of "text-accent-foreground" visually looks identical to "text-accent-foreground/80"
              "text-sm!",
              // "text-xs!",
              "font-light",
              // "h-full!",

              // "h-11 text-base md:h-10",
              // // "h-9 px-3 md:h-8",
              // "h-6 px-3",
              // "md:h-9 p-0",
              // "h-11 text-base md:h-10",

              "lg:text-base lg:w-full lg:h-full",
              "lg:min-w-none",
              "lg:min-h-none",
              "lg:aspect-auto",

              // "xl:text-base xl:w-full xl:h-full",
              // "xl:min-w-none",
              // "xl:min-h-none",
              // "xl:aspect-auto",

              "h-full",
              "w-fit",
              "min-w-7",
              "min-h-7",
              "aspect-square",
              "p-2",
              // "lg:px-5",
              "xl:px-auto",
              "xl:w-full! xl:min-w-0",
              // "2xl:w-fit",
              // "p-2",
              "text-base lg:w-full lg:h-full",
              "min-w-none",
              "min-h-none",
              "aspect-auto",
              "w-full",
              "",
              "",
              "",
              "",
            )}
          >
            <span className="hidden 2xl:block">Send me an e-mail</span>
            {/* <span className="hidden xl:block 2xl:hidden">E-mail</span>
            <Envelope className="block xl:hidden" /> */}

            {/* <span className="hidden lg:block 2xl:hidden">E-mail</span> */}
            <span className="block 2xl:hidden">E-mail</span>
            {/* <Envelope className="block lg:hidden" /> */}
          </Button>
          <Button
            // size="lg"
            size="sm"
            isIconOnly
            variant="tertiary"
            // type="icon"
            // className=""
            className={cn(
              "bg-glass-gray-dark",
              "text-sm",
              "font-thin",

              "lg:min-w-10",
              "lg:min-h-10",

              "h-full",
              "min-w-7",
              "min-h-7",

              "w-fit",
              "p-3!",
              "aspect-square",
              "p-2",

              // "w-fit",
              // "aspect-square",
              // "p-2!",
              "",
              "",
            )}
          >
            <Handset
              className="scale-x-[-1] text-accent-foreground/80" //scale-x-[-1] to mirror icon
            />
          </Button>
        </div>
      </Card>
    </>
  );
}
