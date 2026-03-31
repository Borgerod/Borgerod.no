import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@heroui/react";
import { Card, Separator } from "@heroui/react";
import { SiLeetcode } from "react-icons/si";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { TbBrandGithubFilled } from "react-icons/tb";
import RepoRef from "./RepoRef";

export default function COMPONENTNAME({ className }: ComponentBaseProps) {
  return (
    <Card
      id="social-links social-buttons"
      className={cn(
        "glass",
        "glass-black",
        "text-accent-foreground",
        "h-full",
        "w-full",
        "sm:max-w-fit",
        "flex",
        "flex-col",
        "sm:flex-col",
        "justify-between",
        "sm:justify-evenly",
        "sm:justify-around",
        "sm:gap-5",
        "",
        className,
      )}
    >
      <Card.Header>
        <Card.Title
          className="text-accent-foreground-muted sm:self-center"
          aria-label="social media links"
        >
          Links
        </Card.Title>
        <Separator variant="secondary" className="pb-0 sm:hidden" />
      </Card.Header>
      <Card.Content
        className={cn(
          "sm:contents",
          "flex flex-row",
          "justify-around",
          "justify-between",
        )}
      >
        <Link
          id="linkedin-button url-redirect social-button"
          href={"https://www.linkedin.com/in/borgerod/"}
          aria-label="Redirect to LinkedIn profile"
          className="group bg-glass-gray-light hover:bg-glass-gray-dark grid justify-center items-center content-center justify-items-center text-center min-w-11 min-h-11 rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn
            aria-hidden="true"
            className="size-4 text-accent-foreground-muted group-hover:text-accent-foreground"
          />
        </Link>

        <Link
          id="facebook-button url-redirect social-button"
          href={"https://www.facebook.com/aleksander.borgerod/"}
          aria-label="Redirect to Facebook profile"
          className="group bg-glass-gray-light hover:bg-glass-gray-dark grid justify-center items-center content-center justify-items-center text-center min-w-11 min-h-11 rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF
            aria-hidden="true"
            className="size-5 text-accent-foreground-muted group-hover:text-accent-foreground"
          />
        </Link>

        <Link
          id="github-button url-redirect social-button"
          href={"http://github.com/Borgerod"}
          aria-label="Redirect to GitHub profile"
          className="group bg-glass-gray-light hover:bg-glass-gray-dark grid justify-center items-center content-center justify-items-center text-center min-w-11 min-h-11 rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TbBrandGithubFilled
            aria-hidden="true"
            className="size-5 text-accent-foreground-muted group-hover:text-accent-foreground"
          />
        </Link>

        <Link
          id="leetcode-button url-redirect social-button"
          href={"https://leetcode.com/u/Borgerod/"}
          aria-label="Redirect to Leetcode profile"
          className="group bg-glass-gray-light hover:bg-glass-gray-dark grid justify-center items-center content-center justify-items-center text-center min-w-11 min-h-11 rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiLeetcode
            aria-hidden="true"
            className="size-5 text-accent-foreground-muted group-hover:text-accent-foreground"
          />
        </Link>
      </Card.Content>
      <RepoRef
        className={cn("flex", "pt-5", "sm:hidden!", "row-start-", "col-span-3")}
      />
    </Card>
  );
}
