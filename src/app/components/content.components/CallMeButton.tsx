"use client";
import { Handset } from "@gravity-ui/icons";
import { Button, cn } from "@heroui/react";
import { useCallback } from "react";
import { useDevice } from "@/lib/Providers";
import { Modal } from "@heroui/react";
export const phoneNumberAutoFormat = (phoneNumber: string): string => {
  const hasPlus = phoneNumber.startsWith("+");
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");
  if (number.length < 4) return hasPlus ? "+" + number : number;
  if (number.length < 5)
    return (hasPlus ? "+" : "") + number.replace(/(\d{4})/, "$1");
  if (number.length < 9)
    return (hasPlus ? "+" : "") + number.replace(/(\d{4})(\d{1})/, "$1 $2");
  return (
    (hasPlus ? "+" : "") +
    number.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4")
  );
};
export default function CallMeButton() {
  const phoneNumber: string = "+4699337661"; //avoid phone number leakage. put in .env or use bits?

  const device = useDevice();
  const handleClick = useCallback(() => {
    const url =
      device === "mobile"
        ? `tel:${phoneNumber}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent("")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [phoneNumber, device]);
  /*
    BUG: when it is open and you click out of the windows, then back in again. it becomes unclosable. 
  */
  return (
    <div className="group relative inline-flex">
      <Modal>
        <Button
          onPress={handleClick}
          size="sm"
          isIconOnly
          variant="tertiary"
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

            "",
            "",
          )}
        >
          <Handset className="scale-x-[-1] text-accent-foreground/80" />
        </Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className={cn("glass", "glass-white", "h-fit", "")}>
              <Modal.CloseTrigger className="bg-transparent text-secondary hover:text-primary" />{" "}
              <Modal.Header>
                <Modal.Icon />
                <Modal.Heading />
              </Modal.Header>
              <Modal.Body className={cn("text-primary", "", "")}>
                Call me on: {phoneNumberAutoFormat(phoneNumber)}
              </Modal.Body>
              <Modal.Footer />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
