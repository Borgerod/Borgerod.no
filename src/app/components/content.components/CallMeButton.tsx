"use client";
import { Handset } from "@gravity-ui/icons";
import { Button, cn } from "@heroui/react";
import { useCallback } from "react";
import { useDevice } from "@/lib/Providers";
import { Modal } from "@heroui/react";
export const phoneNumberAutoFormat = (phoneNumber: string): string => {
  const hasPlus = phoneNumber.startsWith("+");
  const number = phoneNumber.trim().replace(/[^\d]/g, "");
  const formatted = number.replace(/(.{2})(?=.)/g, "$1 ");
  return (hasPlus ? "+ " : "") + formatted;
};

export const phoneNumberBinToString = (binaryString: string): string => {
  const bytes = binaryString.split(" ").filter((byte) => byte.length > 0);
  return bytes.map((bin) => String.fromCharCode(parseInt(bin, 2))).join("");
};
export default function CallMeButton() {
  //   const phoneNumber: string = ; //avoid phone number leakage. put in .env or use bits?
  const phoneNumberBin: string =
    "00101011 00110100 00110111 00111001 00111001 00110011 00110011 00110111 00110110 00110110 00110001";
  const phoneNumber: string = phoneNumberBinToString(phoneNumberBin);

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
            <Modal.Dialog
              className={cn(
                "glass",
                "glass-white",
                "h-20 flex content-center justify-self-center",
              )}
            >
              <Modal.CloseTrigger className="bg-transparent text-secondary hover:text-primary" />{" "}
              Call me on: {phoneNumberAutoFormat(phoneNumber)}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
