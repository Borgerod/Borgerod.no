export type ComponentBaseProps = {
  className?: string;
};
export type TagItem = {
  id: string;
  name: string;
  url: string;
};

export type ProjectButton = TagItem & {
  icon: string;
};
