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
import { channelColRef, firebaseAuth } from "../firebase";
import { TChannel } from "./dto";

export const useGetChannelsByUserId = ({ userID = "" }) => {
  const [user] = useAuthState(firebaseAuth);

  const docsRef = useMemo(() => {
    return query(
      channelColRef,
      where("userID", "==", userID || user?.uid || "N/A")
    );
  }, [user?.uid, userID]);

  return useQuery<QuerySnapshot<DocumentData>, unknown, TChannel[], string[]>(
    ["useGetChannelsByUserId", userID || user?.uid || ""],
    () => getDocs(docsRef),
    {
      select: (resp) => formatListDocument<TChannel[]>(resp),
      enabled: !!user?.uid || !!userID,
    }
  );
};
