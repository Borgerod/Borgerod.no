// app/api/leetcode-stats/route.ts

import {
  LeetCodeStatList,
  LeetCodeStats,
  LeetCodeSubmission,
} from "@/lib/types";

const LEETCODE_USERNAME = "Borgerod";
const LEETCODE_API_URL = "https://leetcode.com/graphql";

const QUERY = `
  {
    matchedUser(username: "${LEETCODE_USERNAME}") {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      problemsSolvedBeatsStats {
        difficulty
        percentage
      }
    }
  }
`;

function getAverage({ submissions, beatsPercentage }: LeetCodeStatList) {
  const pct = (d: string) =>
    beatsPercentage.find((b) => b.difficulty === d)?.percentage ?? 0;

  const count = submissions.reduce((a, s) => a + s.count, 0);
  const weighted = submissions.reduce(
    (a, s) => a + pct(s.difficulty) * s.count,
    0,
  );

  return Number((weighted / count).toFixed(2));
}

export async function GET() {
  const res = await fetch(LEETCODE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY }),
  });

  if (!res.ok) throw new Error("Failed to fetch LeetCode stats");

  const json = await res.json();
  const user = json.data.matchedUser;

  const data: LeetCodeStatList = {
    submissions: user.submitStats.acSubmissionNum.filter(
      (s: LeetCodeSubmission) => s.difficulty !== "All",
    ),
    beatsPercentage: user.problemsSolvedBeatsStats,
  };

  const finalData: LeetCodeStats = {
    beatsPercentage: getAverage(data),
    allSubmissions: user.submitStats.acSubmissionNum.find(
      (item: LeetCodeSubmission) => item.difficulty === "All",
    )!.count,
  };

  return Response.json(finalData);
}
