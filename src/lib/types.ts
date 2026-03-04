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
