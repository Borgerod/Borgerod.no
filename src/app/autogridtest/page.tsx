import { Card } from "@heroui/react";
import { cn } from "@heroui/styles";

export default function TestAutoGrid() {
  const items = [
    "Increased efficiancy by automating manual lead generation.",
    "Implemented security measures to hinder unauthorised access, mobile and email verification.",
    "Assigned relation between user and call-list-section for preventing users being assigned the same call-list",
    "To prevent users from scraping the whole list at once, I implemented rules that required the user to confirm when client has been called, so when the user requested a new list any checked list items would be made inaccessable for the users, and the unchecked items would be re-shuffled back to the overall dataset with a no-response tag.",
    "Bypassing google's reCATCHPA, letting me extract google profiles",
    "Extracted and Built the whole dataset (ca 40.000 norwegian companies)",
    "Extracted Every company from; brønnøysund registry, Gulesider.no, 1881.no and proff.no in 19.1 minutes, yielding dataset of ca 250.000 companies that have a confirmed payed listing.",
    "Verified the google profiles of that dataset and made a final Dataset of 10.000-40.000 companies with lacking profiles in 64.6 minutes.",
    "So in total: 10.000-40.000 leads was generated from a list of 1 million norwegian companies, extracted and verified on 5 platforms, all in: 83.2 minutes.",
  ];

  return (
    <main className={cn("h-100 w-200", "")}>
      <div
        className={cn(
          "grid grid-flow-col auto-cols-auto auto-rows-auto",
          "w-200",
          "",
          "",
        )}
      >
        {items.map((value, i) => (
          <Card className="w-50" key={i}>
            {value}
          </Card>
        ))}
      </div>
    </main>
  );
}
