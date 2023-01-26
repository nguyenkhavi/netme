import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useMemo } from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { formatDocument, formatListDocument } from "../../helper";
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
  const docRef = doc(userProfileColRef, user?.uid || "DEFAULT_PATH");

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
      select: (resp) => formatDocument<TUserProfile>(resp),
      enabled: !!user?.uid,
      ...options,
    }
  );
};

export const useGetUserProfileBySlug = ({ slug = "" }) => {
  const docsRef = useMemo(() => {
    return query(userProfileColRef, where("slug", "==", slug));
  }, [slug]);

  return useQuery<DocumentData, unknown, TUserProfile, string[]>(
    ["useGetUserProfileBySlug", slug],
    () => getDocs(docsRef).then((resp) => formatListDocument(resp)?.[0]),
    {
      enabled: !!slug,
    }
  );
};
