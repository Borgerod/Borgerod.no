import { JobItem, LayoutType } from "@/lib/types";

function totalArrayLength(jobArray: string[]): number {
  /* gets the total length of strings in an Array, rounded to closest 100'd */
  return (
    Math.round(jobArray.reduce((acc, curr) => acc + curr.length, 0) / 100) * 100
  );
}

function isWithinthreshold(
  threshold: number,
  checkVal: number,
  limit: number,
): boolean {
  /* Gets the difference between two arrays (%), then compares the difference to a provided threshold (%) => boolean*/
  return Math.abs(checkVal - limit) / Math.max(checkVal, limit) < threshold;
}

function getLengthLimit(job: JobItem) {
  /* 
    thresholds-LIMITS
    - based on the total textcontent of jobCard as a baseline, (optional: add a more-leg-room-extention), then rounds it to closest hundred.
    - this will dictate wether the components being measured exceeds the jobCard size or not.
    - A layout is choosen where the components fit.    
  */
  const jobCardContent = [
    job.title,
    `Employer: ${job.employer}`,
    `Period: ${job.period.start} - ${job.period.end}`,
    `Location: ${job.location}`,
    `Core language/framework: ${job.languages}`,
    `Tools used: ${job.tools}`,
    `Job Description: ${job.description}`,
  ];

  const baseLimit: number = jobCardContent.join("").length;
  const extention: number = 200;
  const lengthLimit: number = Math.round(baseLimit / 100) * 100; // SIMPLE + ROUNDED
  // const lengthLimit: number = baseLimit + extention; //threshold-EXTENTION
  // const lengthLimit: number = Math.round((baseLimit + extention) / 100) * 100; // threshold-EXTENTION + ROUNDED

  return lengthLimit;
}

export default function LayoutBuilder(job: JobItem) {
  /*
  NOTE:  row-start-4 will be an empty row used for this purpose with out breaking the other components.
  this row is designated for ResponsibilitiesCard or AchievementsCard for cases where one of them is too big
  */

  /* seperated just to simplyify LayoutBuilder function  */
  const lengthLimit = getLengthLimit(job);
  const defaultLayout: LayoutType = {
    mainLayout: "flex flex-col md:grid md:grid-cols-2 grid-cols-2",
    jobCardLayout: "col-span-1 row-span-1 row-span-2  ",
    achiCardLayout: "col-start-2 row-start-3 col-span-1 row-span-1  ",
    respCardLayout:
      "col-start-1 row-start-4 row-span-2 col-start-2 row-start-4 col-span-1 row-span-1  ",
  };
  const layout: LayoutType = {
    mainLayout: "",
    jobCardLayout: "",
    achiCardLayout: "",
    respCardLayout: "",
  };

  /* This dictates which layout to use -> returns layout:{mainLayout, achiCardLayout, respCardLayout} */

  const achiCard: number = totalArrayLength(job.achievements);
  const respCard: number = totalArrayLength(job.responsibilities);
  const both: number = achiCard + respCard;

  const threshold_RAcards: number = 0.3;
  const threshold_jobcard: number = 0.15;
  const threshold_both: number = 0.1;

  console.log(`job.company: ${job.employer}: ${job.employer}`);
  console.log(`jobCard (limit): ${lengthLimit}`);
  console.log(`achiCard: ${achiCard}`);
  console.log(`respCard: ${respCard}`);
  console.log(`both: ${both}`);
  console.log(`_________________________________________________: ${"_"}`);
  /* We needs to go three statement-levels deep before we can start taking actions. we need a value for ['both', 'achiCard', 'respCard'] fitting jobCard for this to work. */
  if (
    //>0. (check 'both' DONT fits 'jobCard') NOT isWithinthreshold(threshold, [achiCard + respCard], lengthLimit)
    !isWithinthreshold(threshold_both, both, lengthLimit)
  ) {
    console.log(
      `0 (both DONT fit jobCard):${!isWithinthreshold(threshold_both, both, lengthLimit)} [${Math.abs(both - lengthLimit) / Math.max(both, lengthLimit)} < ${threshold_both}]-> Entering CASE 2`,
    );
    // 2. CASE - [] fits, but ['both'] does not -> Current layout DONT fit, replace Default/Fallback.
    if (
      // >2.0. (check 'achiCard' fits 'jobCard'): isWithinthreshold(threshold, achiCard, lengthLimit)
      isWithinthreshold(threshold_jobcard, achiCard, lengthLimit)
    ) {
      console.log(
        `2.0 (achiCard fits jobCard):${isWithinthreshold(threshold_jobcard, achiCard, lengthLimit)} -> Entering CASE 2.1`,
      );
      //     2.1 CASE - ['achiCard'] fits, but ['both'] does not.
      if (
        //  >2.1.0 (check 'respCard' fits 'jobCard'): isWithinthreshold(threshold, respCard, lengthLimit)
        isWithinthreshold(threshold_jobcard, respCard, lengthLimit)
      ) {
        console.log(
          `2.1.0 (respCard fits jobCard):${isWithinthreshold(threshold_jobcard, respCard, lengthLimit)} -> CASE 2.1.1: respCard to row-start-4, achiCard to row-span-2`,
        );
        // 2.1.1 CASE - ['achiCard', 'respCard'] fits, but ['both'] does not -> Can be either, prefer moving respCard, set respCard to "row-start-4", set achiCard to "row-span-2". (prefer moving respCard to change default layout as little as possible)lay
        layout.mainLayout = "flex flex-col md:grid md:grid-cols-2 grid-cols-2";
        layout.jobCardLayout = "";
        layout.achiCardLayout = "row-span-2";
        layout.respCardLayout = "row-start-4 col-span-2";
      } else {
        console.log(
          `2.1.2 (achiCard fits, respCard & both do NOT):${!isWithinthreshold(threshold_jobcard, respCard, lengthLimit)} -> CASE 2.1.2: respCard to row-start-4, achiCard to row-span-2`,
        );
        // 2.1.2 CASE - ['achiCard'] fits, but ['respCard', 'both'] does not -> set respCard to "row-start-4", set achiCard to "row-span-2".
        layout.mainLayout = "flex flex-col md:grid md:grid-cols-2 grid-cols-2";
        layout.jobCardLayout = "";
        layout.achiCardLayout = "";
        layout.respCardLayout = "row-start-4 col-span-2";
        console.log(
          `2.2 (achiCard & both do NOT fit):${!isWithinthreshold(threshold_jobcard, achiCard, lengthLimit)} -> Entering CASE 2.2`,
        );
      }
    } else {
      //     2.2 CASE - [] fits, but ['achiCard', 'both'] does not.
      if (
        // >2.2.0 (check 'respCard' fits 'jobCard'): isWithinthreshold(threshold, respCard, lengthLimit)
        isWithinthreshold(threshold_jobcard, respCard, lengthLimit)
      ) {
        console.log(
          `2.2.0 (respCard fits jobCard):${isWithinthreshold(threshold_jobcard, respCard, lengthLimit)} -> CASE 2.2.1: achiCard to row-start-4, respCard to row-span-2`,
        );
        // 2.2.1 CASE - ['respCard'] fits, but ['achiCard', 'both'] does not -> set achiCard to "row-start-4", set respCard to "row-span-2".
        layout.mainLayout = "flex flex-col md:grid md:grid-cols-2 grid-cols-2";
        layout.jobCardLayout = "";
        layout.achiCardLayout = "row-start-4 col-span-2";
        layout.respCardLayout = "row-start-3 row-span-2";
        console.log(
          `2.2.2 (respCard, achiCard, both do NOT fit):${!isWithinthreshold(threshold_jobcard, respCard, lengthLimit)} -> Entering CASE 2.2.2`,
        );
      } else {
        // 2.2.2 CASE - [] fits, but ['respCard', 'achiCard', 'both'] does not -> (choice: ['respCard', 'achiCard'] to "row-start-4" || "flex flex-col")
        if (
          // >2.2.2.0 (check 'respCard' fits 'achiCard' ) isWithinthreshold(threshold, respCard, achiCard)
          isWithinthreshold(threshold_RAcards, respCard, achiCard)
        ) {
          console.log(
            `2.2.2.0 (respCard fits achiCard):${isWithinthreshold(threshold_RAcards, respCard, achiCard)} -> CASE 2.2.2.1: respCard === achiCard, both to row-start-4, jobCard to col-span-2`,
          );
          // 2.2.2.1 CASE - 'respCard' === 'achiCard' -> can be together, ['respCard', 'achiCard'] to "row-start-4", set 'jobCard' to "col-span-2".
          layout.mainLayout =
            "flex flex-col md:grid md:grid-cols-2 grid-cols-2";
          layout.jobCardLayout = "col-span-2";
          layout.achiCardLayout = "row-start-4";
          layout.respCardLayout = "row-start-4";
        } else {
          // 2.2.2.2 CASE - 'respCard' =/= 'achiCard' -> cant be together, set parent to "flex flex-col".
          layout.mainLayout = "flex flex-col";
          layout.jobCardLayout = "";
          layout.achiCardLayout = "";
          layout.respCardLayout = "";
          console.log(
            `2.2.2.2 (respCard != achiCard):${!isWithinthreshold(threshold_RAcards, respCard, achiCard)} -> CASE 2.2.2.2: flex flex-col`,
          );
        }
      }
    }
  } else // if isWithinthreshold(threshold, both, lengthLimit)
  {
    console.log(
      `1 (both fit jobCard):${isWithinthreshold(threshold_both, both, lengthLimit)} -> CASE 1: keep Default/Fallback`,
    );

    layout.mainLayout = defaultLayout.mainLayout;
    layout.jobCardLayout = defaultLayout.jobCardLayout;
    layout.achiCardLayout = defaultLayout.achiCardLayout;
    layout.respCardLayout = defaultLayout.respCardLayout;
  }
  console.log(`_________________________________________________`);
  console.log(`layout: ${JSON.stringify(layout)}`);
  return layout;
}

/* >  ALGORITHM DESCRIBED IN WORDS: 
There are 'three' components being moved around in layout: ['jobCardLayout', 'achiCardLayout', 'respCardLayout'].
Where: 
- 'Two' compoents being lengthChecked: ['AchievementsCard', 'ResponsibilitiesCard'].
- Then compared to 'one' component: ['jobCard'].

NOTE: the term "length" is reffering to the "total length of strings in the components dataset, rounded in 100s" [ref: totalArrayLength]

NOTE: for convenience, ["AchievementsCard", "ResponsibilitiesCard"] 
      will be reffered to as: ["AchiCard", "RespCard"]

  Requirements: 
  - None of the components are allowed to "stretch", they must allways be "fitting", (some stretching is allowed, dictated by threshold-%). 
  - The total string-length of 'items in col-1' and 'items in col-2' must be equal, within a certain threshold-%, [ref: isWithinthreshold].
  - When changing layout: prefer to minimize deviation from the default layoutm, and try to maintain the original composure. e.g.: prefer making one change instead of two. This is for seo puposes and visual harmony. 
  // - Items that do not fit in those two cols, gets moved to a new row.
  // - If (AchiCard + RespCard).length exceeds JobCard.length, within a certain threshold it means that stretching occours and new layout is needed. [ref: isWithinthreshold]

  NOTE: the 'x.0' is the if-statement, where 'x.1' is the 'true-case' and 'x.2' is the 'false-case'. 
  NOTE: When movinng card_A to "row-start-4", you have to set card_B to "row-span-2" to fill the gap that card_A left behind.
        jobCard gets set to "col-span-2", when [card_A, card_B] gets set to "row-start-4"
  NOTE: for simplicity, when nothing fits and we are going to set all cards to its own row, were just scraping "grid" setting the parent to "flex flex-col" instead.
  
  *(FALLBACK | DEFAULT) were starting with the FALSE and ending with TRUE cause it creates a cleaner logic in my opinion. 
  >0. (check 'both' DONT fits 'jobCard') NOT isWithinthreshold(threshold, [job.achievements + job.responsibilities], lengthLimit) 
   2. CASE - [] fits, but [_threshold_jobcard'both'] does not -> Current layout DONT fit, replace Default/Fallback.
     >2.0. (check 'achiCard' fits 'jobCard'): isWithinthreshold(threshold, job.achievements_threshold_jobcard, lengthLimit) 

      2.1 CASE - ['achiCard'] fits, but ['both'] does not.
        >2.1.0 (check 'respCard' fits 'jobCard'): isWithinthreshold(threshold, job.responsibilities, lengthLimit) 
          2.1.1 CASE - ['achiCard'_threshold_jobcard, 'respCard'] fits, but ['both'] does not -> Can be either, prefer moving respCard, set respCard to "row-start-4", set achiCard to "row-span-2". (prefer moving respCard to change default layout as little as possible)
          2.1.2 CASE - ['achiCard'] fits, but ['respCard', 'both'] does not -> set respCard to "row-start-4", set achiCard to "row-span-2".

      2.2 CASE - [] fits, but ['achiCard', 'both'] does not.
        >2.2.0 (check 'respCard' fits 'jobCard'): isWithinthreshold(threshold, job.responsibilities, lengthLimit) 
          2.2.1 CASE - ['respCard'] fit_threshold_jobcards, but ['achiCard', 'both'] does not -> set achiCard to "row-start-4", set respCard to "row-span-2".
          2.2.2 CASE - [] fits, but ['respCard', 'achiCard', 'both'] does not -> (choice: ['respCard', 'achiCard'] to "row-start-4" || "flex flex-col")
          >2.2.2.0 (check 'respCard' fits 'achiCard' ) isWithinthreshold(threshold, job.responsibilities, job.achievements)
            2.2.2.1 CASE - 'respCard' === 'achiCard' -> can be together, ['respCard', 'achiCard'] to "row-start-4", set 'jobCard' to "col-span-2".
            2.2.2.2 CASE - 'respCard' =/= 'achiCard' -> cant be together, set parent to "flex flex-col".

  1. CASE - ['both'] fits, but [] does not -> Current layout DO fit, keep Default/Fallback.
*/
