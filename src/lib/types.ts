export type ComponentBaseProps = {
  className?: string;
};
export type TagItem = {
  id: string;
  name: string;
  url: string;
};

export type ProjectItem = TagItem & {
  icon: string;
  alt: string;
  description: string;
  coretool: string;
  subtools: string[];
};

export type JobItem = {
  id: string;
  period: { start: string; end: string };
  title: string;
  employer: string;
  employer_profile: {
    name: string;
    avatar: string;
    logo: string;
    website: string;
    industry: string;
    description: string;
  };
  location: string;
  isProject: boolean;
  position: string[];
  responsibilities: string[];
  languages: string[];
  tools: string[];
  achievements: string[];
  description: string;
  assets: string[];
};

export type LayoutType = {
  mainLayout: string;
  jobCardLayout: string;
  achiCardLayout: string;
  respCardLayout: string;
};

export type Stats = {
  github: GitHubStats | null;
  leetCode: LeetCodeStats | null;
  loading: boolean;
};

export type BentoItem = {
  text: string | string[];
  span: number | number[];
};
export type GitHubStats = {
  yearsExp: number;
  yearsExpProf: number;
  totalRepos: number;
  totalContributions: number;
};

export type LeetCodeStatList = {
  beatsPercentage: LeetCodeBeats[];
  submissions: LeetCodeSubmission[];
};

export type LeetCodeStats = {
  beatsPercentage: number;
  allSubmissions: number;
};

export type LeetCodeSubmission = {
  // child type of LeetCodeStats
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  count: number;
  submissions: number;
};

export type LeetCodeBeats = {
  // child type of LeetCodeStats
  difficulty: "Easy" | "Medium" | "Hard";
  percentage: number;
};

export type SharedModalProps = {
  src: string;
  assets: string[];
  currentIndex: number;
  closeModal: () => void;
  navigate: (src: string) => void;
};
