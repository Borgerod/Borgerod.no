import Image from "next/image";
import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button, Card } from "@heroui/react";
import { FaPhone, FaPhoneAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Handset } from "@gravity-ui/icons";

export default function ProfileCard({ className }: ComponentBaseProps) {
  return (
    <>
      <Card
        // IDEA have a parent, this will just overlap parent completly.
        className={cn(
          "glass",
          "col-span-full",
          "col-start-1",
          "row-start-1",
          "row-span-3",
          "-m-4",
          "",
          "",
        )}
      ></Card>

      <Card
        id="profile-card"
        className={cn(
          // "bg-amber-200",
          // "h-",
          "glass",
          "relative",
          "-left-10",
          "w-[calc(100%+2.5rem)]", //adjusting for the left-transform

          "justify-center",
          "content-center",
          "items-stretch",

          "",
          "",
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
            /* * grid placement * */
            "col-start-1",
            "col-span-1",
            "row-start-1",
            "row-span-1",
            "",
            "",
          )}
        >
          <Image
            src="/assets/images/profilePictureSquare.png"
            alt="profile picture avatar"
            width={200}
            height={200}
            className={cn("h-full", "w-full", "", "")}
          />
        </div>
        <div
          id="bio"
          className={cn(
            // "bg-amber-100",
            /* * grid placement * */
            "col-start-",
            "col-span-",
            "row-start-",
            "row-span-",

            "",
            "",
          )}
        >
          <h1 className="text-">ALEKSANDER BORGERØD</h1>
          <h2 className="text-lg text-secondary">
            Fullstackutvikler og økonom
          </h2>
          <p className="text-sm">
            With a broad knowledge within development and business, that
            stretches over statistics, marketing and design; makes me the
            perfect fit for your company.
            <br />
            <br />
            A diligent worker that strives for flourishing profit margins,
            ambitious to climb your corporate ladder. As an aspiring family man
            i seek the stability of a long term employment.
            <br />
            <br />
            So, with my vigor and good solutions, I am confident that I am the
            one you are looking for.
          </p>
        </div>
        <div
          id="contact"
          className={cn(
            // "bg-amber-300",
            "flex",
            "items-center",
            "justify-center",
            "gap-2",
            /* * grid placement * */
            "col-start-",
            "col-span-",
            "row-start-",
            "row-span-",
            "h-auto",
            "",
            "",
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
            <Handset className="scale-x-[-1]" />
          </Button>
        </div>
      </Card>
    </>
  );
}
