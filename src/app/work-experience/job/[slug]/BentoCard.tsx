// import { BentoItem } from "@/lib/types";
// import { Card } from "@heroui/react";
// import { cn } from "@heroui/styles";

// export default function BentoCard(
//   item: BentoItem,
//   idx: number,
//   span: string,
// ): React.ReactElement {
//   return (
//     <Card
//       id="row-item box bento-box"
//       key={idx}
//       className={cn(
//         "h-full rounded-xl flex justify-center items-center",
//         span || "row-span-1",
//         "text-center",
//         "",
//         "",
//       )}
//     >
//       {Array.isArray(item.text) ? item.text[idx] : item.text}
//     </Card>
//   );
// }

import { Card, cn } from "@heroui/react";

export default function BentoCard({ text }: { text: string }) {
  return (
    <Card
      className={cn(
        "h-full rounded-xl flex justify-center items-center text-center p-3",
        // "bg-white dark:bg-gray-800"
      )}
    >
      {text}
    </Card>
  );
}

// import { Card, cn } from "@heroui/react";

// export default function BentoCard({ text }: { text: string }) {
//   return (
//     <Card
//       className={cn(
//         "h-full rounded-xl flex justify-center items-center text-center p-2",
//         // "h-full rounded-xl flex justify-center items-center",
//         // "row-span-1",
//         // "text-center",
//         "",
//         "",
//       )}
//     >
//       {text}
//     </Card>
//   );
// }
