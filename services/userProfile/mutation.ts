import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import { useMutation, UseMutationOptions } from "react-query";
import { TError } from "../../types/global";
import { userProfileColRef, firebaseAuth } from "../firebase";
import { TCreateUserProfile } from "./dto";
import { useAuthState } from "react-firebase-hooks/auth";

export const useCreateUserProfile = (
  options: UseMutationOptions<DocumentData, TError, TCreateUserProfile>
) => {
  const [user] = useAuthState(firebaseAuth);
  // const docsRef = useMemo(() => {
  //   return doc(userProfileColRef, "userID", "==", user?.uid || "N/A");
  // }, [user?.uid]);

  return useMutation<DocumentData, TError, TCreateUserProfile>(
    ["useCreateUserProfile", user?.uid],
    (dto) => {
      const docsRef = doc(userProfileColRef, user?.uid || "DEFAULT_PATH");
      setDoc(docsRef, {
        createdAt: new Date().toISOString(),
        ...dto,
        userID: user?.uid,
        updatedAt: new Date().toISOString(),
      });
      return getDoc(docsRef);
    },
    {
      ...options,
    }
  );
};
