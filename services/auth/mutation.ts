import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { useMutation, UseMutationOptions } from "react-query";
import { TError } from "../../types/global";
import { firebaseAuth } from "../firebase";
import { TLogIn, TRegister } from "./dto";

export const useRegister = (
  options: UseMutationOptions<UserCredential, TError, TRegister>
) => {
  return useMutation<UserCredential, TError, TRegister>(
    (dto) =>
      createUserWithEmailAndPassword(
        firebaseAuth,
        dto.email,
        dto.password
      ).then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: dto.displayName,
        });
        return userCredential;
      }),
    options
  );
};

export const useLogin = (
  options: UseMutationOptions<UserCredential, TError, TLogIn>
) => {
  return useMutation<UserCredential, TError, TLogIn>(
    (dto) => signInWithEmailAndPassword(firebaseAuth, dto.email, dto.password),
    options
  );
};

export const useSignOut = (
  options: UseMutationOptions<void, TError, undefined>
) => {
  return useMutation<void, TError, undefined>(
    () => signOut(firebaseAuth),
    options
  );
};
