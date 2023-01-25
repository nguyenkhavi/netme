import {
  addDoc,
  collection,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { useMutation, UseMutationOptions } from "react-query";
import { TError } from "../../types/global";
import { firebaseAuth, firestore } from "../firebase";
import { TCreateChannel } from "./dto";
import { useAuthState } from "react-firebase-hooks/auth";

export const channelColRef = collection(firestore, "channels");

export const useCreateChannel = (
  options: UseMutationOptions<DocumentData, TError, TCreateChannel>
) => {
  const [user] = useAuthState(firebaseAuth);

  return useMutation<DocumentData, TError, TCreateChannel>(
    (dto) =>
      addDoc(channelColRef, {
        ...dto,
        userID: user?.uid,
        createdAt: serverTimestamp(),
        ID: uuidv4(),
      }),
    {
      ...options,
    }
  );
};
