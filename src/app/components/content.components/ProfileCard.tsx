import Image from "next/image";
import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button, Card } from "@heroui/react";

import { Handset } from "@gravity-ui/icons";

export default function ProfileCard({ className }: ComponentBaseProps) {
  /* used by: profile-image-masking */
  const circleDiameter = 60;
  const circleRadius = Math.round(circleDiameter / 2);
  const rectangleHeight = Math.round((circleDiameter * 2) / 3);
  const rectangleWidth = Math.round((((circleDiameter * 16) / 9) * 2) / 3);

  return (
    <>
      <Card
        id="profile-card"
        className={cn(
          "glass",
          "glass-pure-white",
          "glass-upper",
          "gap-5",
          "-left-10",
          "w-[calc(100%+2.5rem)]",
          "flex",
          "flex-col",
          "items-center",
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
            "min-h-40",
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
            "h-fit",
            "overflow-hidden",
            "text-xs",
          )}
        >
          <h1 className="text-lg">ALEKSANDER BORGERØD</h1>
          <h2 className="text-sm font-light text-green-dark">
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
            So, with my{" "}
            <span className="font-medium text-green-dark">good solutions</span>{" "}
            and{" "}
            <span className="font-medium text-green-dark">driven vigor</span>, I
            am confident that I am the one you are looking for.
          </p>
        </div>

        <div
          id="contact-buttons-row"
          className={cn(
            "flex",
            "gap-2",
            "h-fit",
            "overflow-hidden",
            "col-start-",
            "col-span-",
            "row-start-3",
            "row-span-1",
          )}
        >
          <Button
            size="lg"
            className="bg-glass-gray-dark text-white text-sm font-light px-8"
          >
            Send me an e-mail
          </Button>

          <Button
            size="lg"
            isIconOnly
            variant="tertiary"
            className="aspect-square bg-glass-gray-dark text-white text-sm font-thin"
          >
            <Handset
              className="scale-x-[-1]" //scale-x-[-1] to mirror icon
            />
          </Button>
        </div>
      </Card>
    </>
  );
}
