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
          "gap-5",
          ////* Placement
          "-left-10",
          "w-[calc(100%+2.5rem)]", //adjusting for the left-transform
          className,
        )}
      >
        <div
          className={cn(
            "aspect-square",
            "w-full",
            "max-w-xs",
            "overflow-hidden",
            "rounded-b-full",
            "overflow-hidden",
            "rounded-b-full",

            ////*  grid placement
            "col-start-1",
            "col-span-1",
            "row-start-1",
            "row-span-1",
          )}
        >
          <svg
            id="profile-image"
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
              className="fill-default"
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
          id="bio"
          className={cn(
            ////*  grid placement
            "col-start-",
            "col-span-",
            "row-start-",
            "row-span-",
          )}
        >
          <h1 className="text-lg">ALEKSANDER BORGERØD</h1>
          <h2 className="text-lg font-light">Fullstackutvikler og økonom</h2>
          <p className="text-sm">
            With a broad knowledge within development and business, that
            stretches over statistics, marketing and design; makes me the
            perfect fit for your company.
            <br />
            <br />
            A diligent worker that strives for flourishing profit margins,
            ambitious to climb your corporate ladder. As an aspiring family man
            i seek the stability of a long term employment. I seek the stability
            of a long term employment.
            <br />
            So, with my vigor and good solutions, I am confident that I am the
            one you are looking for.
          </p>
        </div>
        <div
          id="contact"
          className={cn(
            "flex",
            "items-center",
            "justify-center",
            "gap-2",

            ////*  grid placement
            "col-start-",
            "col-span-",
            "row-start-",
            "row-span-",
            "h-auto",
          )}
        >
          <Button variant="tertiary" className="bg-foreground/50  text-white">
            Send me an Email{" "}
          </Button>

          <Button
            isIconOnly
            variant="tertiary"
            className="bg-foreground/50  text-white"
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
