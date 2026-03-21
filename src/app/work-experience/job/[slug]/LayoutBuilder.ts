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

  const lengthLimit: number = Math.round(baseLimit / 100) * 100;

  return lengthLimit;
}

export default function LayoutBuilder(job: JobItem) {
  const lengthLimit = getLengthLimit(job);
  const defaultLayout: LayoutType = {
    mainLayout:
      "flex flex-col md:grid md:grid-cols-2 grid-cols-2 md:space-y-5 md:gap-5",
    jobCardLayout: "col-span-1 row-span-1 row-span-2",
    achiCardLayout: "col-start-2 row-start-3 col-span-1 row-span-1",
    respCardLayout: "col-start-2 row-start-4 col-span-1 row-span-1",
  };

  const layout: LayoutType = {
    mainLayout: "",
    jobCardLayout: "",
    achiCardLayout: "",
    respCardLayout: "",
  };

  const achiCard = totalArrayLength(job.achievements);
  const respCard = totalArrayLength(job.responsibilities);
  const both = achiCard + respCard;

  const threshold_RAcards = 0.3;
  const threshold_jobcard = 0.15;
  const threshold_both = 0.1;

  if (!isWithinthreshold(threshold_both, both, lengthLimit)) {
    if (isWithinthreshold(threshold_jobcard, achiCard, lengthLimit)) {
      if (isWithinthreshold(threshold_jobcard, respCard, lengthLimit)) {
        // 2.1.1: both fit individually but not together → achi fills gap, resp goes full-width below
        layout.mainLayout =
          "flex flex-col md:grid md:grid-cols-2 grid-cols-2 md:space-y-5 md:gap-5";
        layout.jobCardLayout = "";
        layout.achiCardLayout = "row-span-2";
        layout.respCardLayout = "row-start-4 col-span-2";
      } else {
        // 2.1.2 (UPWORK): achiCard fits, respCard is too big
        // jobCard col-1 + achiCard col-2 on same row, respCard full-width below
        layout.mainLayout =
          "flex flex-col md:grid md:grid-cols-2 grid-cols-2 md:space-y-5 md:gap-5";
        layout.jobCardLayout = "";
        layout.achiCardLayout = "";
        layout.respCardLayout = "row-start-4 col-span-2";
      }
    } else {
      if (isWithinthreshold(threshold_jobcard, respCard, lengthLimit)) {
        // 2.2.1: respCard fits, achiCard is too big
        // jobCard col-1 + respCard col-2 on same row, achiCard full-width below
        layout.mainLayout =
          "flex flex-col md:grid md:grid-cols-2 grid-cols-2 md:space-y-5 md:gap-5";
        layout.jobCardLayout = "";
        layout.achiCardLayout = "row-start-4 col-span-2";
        layout.respCardLayout = "row-span-2";
      } else {
        if (isWithinthreshold(threshold_RAcards, respCard, achiCard)) {
          // 2.2.2.1: resp ≈ achi in size → jobCard spans full width, both below side by side
          layout.mainLayout =
            "flex flex-col md:grid md:grid-cols-2 grid-cols-2 md:space-y-5 md:gap-5";
          layout.jobCardLayout = "col-span-2";
          layout.achiCardLayout = "row-start-4";
          layout.respCardLayout = "row-start-4";
        } else {
          // 2.2.2.2: nothing fits together → stack everything in one column
          layout.mainLayout = "flex flex-col md:space-y-5 md:gap-5";
          layout.jobCardLayout = "";
          layout.achiCardLayout = "";
          layout.respCardLayout = "";
        }
      }
    }
  } else {
    return defaultLayout;
  }

  if (!layout.mainLayout) return defaultLayout;

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
