"use client";
import { Avatar, Button, Card, cn } from "@heroui/react";
import { useRouter } from "next/navigation";
import CallMeButton from "./CallMeButton";
import { ComponentBaseProps } from "@/lib/types";
export default function ProfileCard({ className }: ComponentBaseProps) {
  /* used by: profile-image-masking */
  const circleDiameter = 60;
  const circleRadius = Math.round(circleDiameter / 2);
  const rectangleHeight = Math.round((circleDiameter * 2) / 3);
  const rectangleWidth = Math.round((((circleDiameter * 16) / 9) * 2) / 3);
  const router = useRouter();

  /*! BUG (1.1): profile Card blur effect sometimes dissapears
  TODO: move to bug-report.txt 
  INFO: 
      project version - 0.4.0
      date, discovered: 12.03.2026
      date, solved: 
      related files: ProfileCard, (relevant to; ListCard.tools.tsx, SocialLinksCard.tsx)
*/

  return (
    <Card
      id="profile-card"
      className={cn(
        "glass",
        "glass-upper",
        "-left-10",
        "w-[calc(100%+2.5rem)]",
        "w-[calc(100%+3rem)]",
        "flex",
        "flex-col",
        "justify-between",
        "justify-start",
        "gap-1",
        "2xl:gap-2",
        "gap-5",
        "",
        "",
        className,
      )}
    >
      <Card.Header
        id="profile-image-row"
        className={cn(
          "w-full",
          "flex-1",
          "min-h-0",
          "flex",
          "justify-center",
          "items-center",
          "overflow-hidden",
          "min-h-fit",
          "max-h-50",
          "gap-4",
          "",
        )}
      >
        <Avatar className="contents">
          <svg
            id="profile-image"
            className={cn(
              "w-full",
              "h-auto",
              "max-w-full",
              "max-h-full",
              "aspect-square",
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
        </Avatar>
        {/* <Card.Description className="self-start"> */}
        <div id="header-content header-text-wrapper" className="self-start ">
          <Card.Title className="self-start font-normal text-md md:text-[14px] lg:text-lg">
            ALEKSANDER BORGERØD
          </Card.Title>
          <Card.Description className="self-start text-xs  font-light text-green-dark">
            Full-Stack Developer | Business Admin.
          </Card.Description>
        </div>
      </Card.Header>

      <Card.Content
        id="bio-row"
        className={cn(
          "col-start-",
          "col-span-",
          "row-start-2",
          "row-span-1",
          "overflow-hidden",
          "text-xs",
          "h-fit",
          "justify-self-start",
        )}
      >
        {/* <h1 className="text-md md:text-[14px] lg:text-lg">
            ALEKSANDER BORGERØD
          </h1>
          <h2 className="text-xs  font-light text-green-dark">
            Full-Stack Developer | Business Admin.
          </h2> */}

        {/* <br /> */}
        <p className="font-light">
          With a broad knowledge within
          <span className="font-medium text-green-dark"> development</span> and
          <span className="font-medium text-green-dark"> business</span>, that
          stretches over statistics, marketing and design; makes me the perfect
          fit for your company.
          <br />
          <br />A <span className="font-medium text-green-dark">
            diligent
          </span>{" "}
          worker that strives for flourishing profit margins,
          <span className="font-medium text-green-dark"> ambitious </span>
          to climb your corporate ladder. As an aspiring family man, I seek the
          stability of a long term employment.
          <br />
          <br />
        </p>
        <p className="tracking-wide font-light text-green-dark">
          So, with{" "}
          <span className="font-medium text-green-dark">good solutions</span>{" "}
          and <span className="font-medium text-green-dark">driven vigor</span>,
          I am confident that I am the one you are looking for.
        </p>
      </Card.Content>

      <Card.Footer
        id="contact-buttons-row"
        className={cn(
          "flex",
          "gap-2",
          "h-full",
          "h-10",
          "h-fit",
          "overflow-visible",
          "col-start-",
          "col-span-",
          "row-start-3",
          "row-span-1",
          "xl:w-full",
          "w-full",
          "justify-end",
          "xl:justify-between",
          "mt-auto",
        )}
      >
        <Button
          id="email-button"
          type="button"
          onClick={() => router.push("mailto:a.borgerod@gmail.com")}
          isIconOnly
          className={cn(
            "bg-glass-gray-dark hover:bg-glass-gray-dark-hover",
            "text-accent-foreground", //*due to the thin weight, the color of "text-accent-foreground" visually looks identical to "text-accent-foreground-muted"
            "text-sm!",
            "font-light",
            "lg:text-base lg:w-full lg:h-full",
            "lg:min-w-none",
            "lg:min-h-none",
            "lg:aspect-auto",
            "h-full",
            "w-fit",
            "min-w-7",
            "min-h-7",
            "aspect-square",
            "p-2",
            "xl:px-auto",
            "text-base lg:w-full lg:h-full",
            "xl:w-full! xl:min-w-0",
            "min-w-none",
            "min-h-none",
            "aspect-auto",
            "w-full",
            "",
            "",
          )}
        >
          <span className="hidden 2xl:block">Send me an e-mail</span>
          <span className="block 2xl:hidden">E-mail</span>
        </Button>
        <CallMeButton />
      </Card.Footer>
    </Card>
  );
}
