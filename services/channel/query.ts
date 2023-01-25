import {
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { formatListDocument } from "../../helper";
import { firebaseAuth } from "../firebase";
import { TChannel } from "./dto";
import { channelColRef } from "./mutation";

export const useGetChannelsByUserId = () => {
  const [user] = useAuthState(firebaseAuth);

  const docsRef = useMemo(() => {
    return query(channelColRef, where("userID", "==", user?.uid || "N/A"));
  }, [user?.uid]);

  return useQuery<QuerySnapshot<DocumentData>, unknown, TChannel[], string[]>(
    ["useGetChannelsByUserId", user?.uid || ""],
    () => getDocs(docsRef),
    {
      select: (resp) => formatListDocument<TChannel[]>(resp),
      enabled: !!user?.uid,
    }
  );
};
