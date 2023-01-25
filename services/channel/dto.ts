import { TTimestamp } from "../../types/global";

export type TCreateChannel = {
  title: string;
  url: string;
};

export type TChannel = TTimestamp & {
  title: string;
  url: string;
  userID: string;
};
