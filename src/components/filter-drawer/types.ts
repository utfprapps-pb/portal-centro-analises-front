export type FilterDrawerList = {
  value: string;
  label: string;
};

export type FilterDrawerProps = {
  list: Array<FilterDrawerList>;
  handleSearchChange: (joined: string) => void;
};
