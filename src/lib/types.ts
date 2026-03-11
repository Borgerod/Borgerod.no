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

export type BentoItem = {
  text: string | string[];
  span: number | number[];
};
