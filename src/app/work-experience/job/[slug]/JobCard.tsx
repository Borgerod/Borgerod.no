import { JobItem } from "@/lib/types";
import { Card, Chip, cn } from "@heroui/react";

type JobCardProps = {
  job: JobItem;
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card
      id="job-card"
      className={cn(
        "bg-transparent",
        "shadow-none",
        "md:bg-glass-white",
        "md:shadow",
        "md:glass",
        "md:glass-white",
        "w-fit",
        "flex",
        "flex-0",
        "max-w-2xl",
        "min-w-sm",
        "rounded-none",
        "md:rounded-3xl",
        "justify-between",
        "justify-start",
        "gap-2",
        "pt-4",
        "col-start-1",
        "col-span-2",
        "row-start-3",
        "row-span-1",
        "md:col-span-1",
        "md:col-start-1",
        "md:row-start-3",
        "md:row-span-2",
        "",
        "",
      )}
    >
      <Card.Title className="text-lg">{job.title}</Card.Title>
      <div>
        <p className={cn("text-secondary", "", "")}>Employer: {job.employer}</p>
        <p className={cn("text-secondary", "", "")}>
          Period: {job.period.start} - {job.period.end}
        </p>
        <p className={cn("text-secondary", "", "")}>Location: {job.location}</p>
        <p id="job-core">
          <ul className={cn("font-semibold text-md flex gap-2", "", "")}>
            <h3>Core language/framework:</h3>
            {job.languages.map((language: string, i: number) => (
              <li key={i}>{language}</li>
            ))}
          </ul>
        </p>
        <p className={cn("flex flex-col gap-1 text-nowrap text-start", "", "")}>
          <h3>Tools used: </h3>
          <ul className={cn("flex gap-1 flex-wrap pl-2", "", "")}>
            {job.tools.map((tool: string, i: number) => (
              <Chip
                size="sm"
                variant="soft"
                key={i}
                id={`chip-${i} ${job}`}
                className={cn(
                  "font-light px-2 py-0 h-4 w-fit",
                  "bg-glass-gray/50",
                  "select-none",
                  "group-hover:bg-glass-green-base!",
                  "self-center",
                  "",
                  "",
                )}
              >
                {tool}
              </Chip>
            ))}
          </ul>
        </p>
      </div>
      <p id="job-description" className={cn("flex flex-col mt-auto", "", "")}>
        <h3 className="text-lg">Job Description</h3>
        {job.description
          .split(/\. |;|:/)
          .map((paragraph: string, i: number) => (
            <p key={i} className={cn("p-2", "", "")}>
              {paragraph}
              {i < job.description.split(/\. |;|:/).length - 1 && "."}
            </p>
          ))}
      </p>
      <p></p>
    </Card>
  );
}
//    <Card
//         id="job-card"
//         className={cn(
//           "bg-transparent",
//           "shadow-none",
//           "md:bg-glass-white",
//           "md:shadow",

//           "md:glass",
//           "md:glass-white",
//           "w-fit",
//           "flex",
//           "flex-0",
//           "max-w-2xl",
//           "min-w-sm",
//           "rounded-none",
//           "md:rounded-3xl",
//           "justify-between",
//           "justify-start",
//           "gap-2",

//           // "pt-24",
//           // "md:pt-4",
//           "pt-4",

//           "col-start-1",
//           "col-span-2",
//           "row-start-3",
//           "row-span-1",

//           "md:col-span-1",
//           "md:col-start-1",
//           "md:row-start-3",
//           "md:row-span-2",
//         )}
//       >
//         <Card.Title className="text-lg">{job.title}</Card.Title>

//         <div>
//           <p className={cn("text-secondary")}>Employer: {job.employer}</p>
//           <p className={cn("text-secondary")}>
//             Period: {job.period.start} - {job.period.end}
//           </p>
//           <p className={cn("text-secondary")}>Location: {job.location}</p>
//           <p id="job-core">
//             <ul className="font-semibold text-md flex gap-2">
//               <h3>Core language/framework:</h3>{" "}
//               {job.languages.map((language: string, i: number) => (
//                 <li key={i}>{language}</li>
//               ))}
//             </ul>
//           </p>

//           <p className="flex flex-col gap-1 text-nowrap text-start">
//             <h3>Tools used: </h3>
//             <ul className="flex gap-1 flex-wrap pl-2">
//               {job.tools.map((tool: string, i: number) => (
//                 <Chip
//                   size="sm"
//                   variant="soft"
//                   key={i}
//                   id={`chip-${i} ${job}`}
//                   className={cn(
//                     "font-light px-2 py-0 h-4 w-fit",
//                     "bg-glass-gray/50", //todo custom color!
//                     "select-none",
//                     "group-hover:bg-glass-green-base!",
//                     "self-center",
//                   )}
//                 >
//                   {tool}
//                 </Chip>
//               ))}
//             </ul>
//           </p>
//         </div>
//         <p id="job-description" className="flex flex-col mt-auto">
//           <h3 className="text-lg">Job Description</h3>
//           {job.description
//             .split(/\. |;|:/)
//             .map((paragraph: string, i: number) => (
//               <p key={i} className="p-2">
//                 {paragraph}
//                 {i < job.description.split(/\. |;|:/).length - 1 && "."}{" "}
//               </p>
//             ))}
//         </p>

//         {/* <p id="achievements" className="flex flex-col">
//           <h3 className="text-lg">Achievements</h3>
//           <ul>
//             {job.achievements.map((paragraph: string, i: number) => (
//               <li key={i}>- {paragraph} </li>
//             ))}
//           </ul>
//         </p> */}
//         {/* <p id="responsibilities" className="flex flex-col">
//           <h3 className="text-lg">Responsibilities</h3>
//           <ul>
//             {job.responsibilities.map((paragraph: string, i: number) => (
//               <li key={i}>- {paragraph} </li>
//             ))}
//           </ul>
//         </p> */}

//         <p></p>
//       </Card>
