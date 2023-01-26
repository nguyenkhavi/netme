import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  updateProfile,
  signInWithPopup,
  AuthProvider,
} from "firebase/auth";
import { useMutation, UseMutationOptions } from "react-query";
import { convertToSlug, onlyPrimitives } from "../../helper";
import { TError } from "../../types/global";
import { firebaseAuth } from "../firebase";
import { useCreateUserProfile } from "../userProfile/mutation";
import { TLogIn, TRegister } from "./dto";

export const useRegister = (
  options: UseMutationOptions<UserCredential, TError, TRegister>
) => {
  const { mutate: createUserProfile } = useCreateUserProfile({});
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
        const slug = convertToSlug(dto.displayName) || dto.email.split("@")[0];
        createUserProfile({
          ...onlyPrimitives(userCredential.user),
          slug,
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
    (dto) =>
      signInWithEmailAndPassword(firebaseAuth, dto.email, dto.password).then(
        (userCredential) => {
          return userCredential;
        }
      ),
    options
  );
};

export const useSocialLogin = ({
  ...options
}: UseMutationOptions<UserCredential, TError, { provider: AuthProvider }>) => {
  const { mutate: createUserProfile } = useCreateUserProfile({});

  return useMutation(
    ({ provider }) =>
      signInWithPopup(firebaseAuth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const slug =
          convertToSlug(result?.user?.displayName) ||
          result.user.email.split("@")[0];
        createUserProfile({
          ...onlyPrimitives(result.user),
          slug,
        });
        return result;
      }),
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
