import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { useMutation, UseMutationOptions } from "react-query";
import { TError } from "../../types/global";
import { channelColRef, firebaseAuth } from "../firebase";
import { TCreateChannel, TUpdateChannel } from "./dto";
import { useAuthState } from "react-firebase-hooks/auth";

export const useCreateChannel = (
  options: UseMutationOptions<DocumentData, TError, TCreateChannel>
) => {
  const [user] = useAuthState(firebaseAuth);

  return useMutation<DocumentData, TError, TCreateChannel>(
    (dto) => {
      const ID = uuidv4();
      const docRef = doc(channelColRef, ID);

      setDoc(docRef, {
        ...dto,
        userID: user?.uid,
        createdAt: new Date().toISOString(),
        ID,
      });
      return getDoc(docRef);
    },
    {
      ...options,
    }
  );
};

export const useUpdateChannel = (
  options: UseMutationOptions<DocumentData, TError, TUpdateChannel>
) => {
  return useMutation<DocumentData, TError, TUpdateChannel>(
    (dto) => {
      const docRef = doc(channelColRef, dto.ID);

      setDoc(
        docRef,
        {
          ...dto,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      return getDoc(docRef);
    },
    {
      ...options,
    }
  );
};
