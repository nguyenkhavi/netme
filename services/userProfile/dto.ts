import { User } from "firebase/auth";
import { TTimestamp } from "../../types/global";

export type TCreateUserProfile = {
  userID: string;
  slug?: string;
  location?: string;
  jobTitles?: string[];
  bio?: string;
};

export type TUserProfile = TTimestamp & TCreateUserProfile & User;
