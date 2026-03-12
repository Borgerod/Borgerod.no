import { GitHubStats } from "@/lib/types";

const GITHUB_USERNAME = "borgerod";
const GITHUB_API_URL = "https://api.github.com/graphql";

const QUERY = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      createdAt
      repositories(ownerAffiliations: OWNER) {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

export async function GET() {
  const res = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY }),
  });

  if (!res.ok) throw new Error("Failed to fetch GitHub stats");

  const json = await res.json();
  const user = json.data.user;
  const startDate = new Date("2021-01-06T13:29:33Z");
  const profStart = new Date(user.createdAt);
  const today = new Date();
  const startDiff = today.getFullYear() - startDate.getFullYear();
  const profDiff = today.getFullYear() - profStart.getFullYear();
  const data: GitHubStats = {
    yearsExp: startDiff,
    yearsExpProf: profDiff,
    totalRepos: user.repositories.totalCount,
    totalContributions:
      user.contributionsCollection.contributionCalendar.totalContributions,
  };

  return Response.json(data);
}
