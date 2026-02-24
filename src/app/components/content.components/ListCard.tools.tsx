import { ComponentBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";

export default function SkillCard({ className }: ComponentBaseProps) {
  return (
    <Card id="skills" className={cn("bg-gray-200", className, "", "")}></Card>
  );
}
