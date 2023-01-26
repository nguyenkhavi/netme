import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
} from "firebase/firestore";
import { useMemo } from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { formatDocument } from "../../helper";
import { firebaseAuth, userProfileColRef } from "../firebase";
import { TUserProfile } from "./dto";

export const useGetUserProfile = (
  options: UseQueryOptions<
    DocumentSnapshot<DocumentData>,
    unknown,
    TUserProfile,
    string[]
  >
) => {
  const [user] = useAuthState(firebaseAuth);
  const docRef = doc(userProfileColRef, user?.uid || "");

  return useQuery<
    DocumentSnapshot<DocumentData>,
    unknown,
    TUserProfile,
    string[]
  >(
    ["useGetUserProfile", user?.uid || ""],
    () => {
      return getDoc(docRef);
    },
    {
      select: (resp) => ({ ...formatDocument<TUserProfile>(resp), ...user }),
      enabled: !!user?.uid,
      ...options,
    }
  );
};
