import { getDownloadURL, uploadBytes } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMutation, UseMutationOptions } from "react-query";
import { TError } from "../../types/global";
import { firebaseAuth, getStorageRef } from "../firebase";

export const useUploadFile = (
  options: UseMutationOptions<string, TError, File>
) => {
  const [user] = useAuthState(firebaseAuth);
  return useMutation<string, TError, File>(
    ["useUploadFile"],
    async (file) => {
      const filename = `${user.uid}_${new Date().toISOString()}_${file.name}`;
      const storageRef = getStorageRef(filename);
      const uploadResult = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(uploadResult.ref);
      return photoURL;
    },
    {
      ...options,
    }
  );
};
