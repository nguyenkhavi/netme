import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";

export const formatListDocument = <R extends any[]>(
  snapshots: QuerySnapshot<DocumentData>
): R => {
  return snapshots.docs.map((doc) => doc.data()) as R;
};

export const formatDocument = <R>(
  snapshots: DocumentSnapshot<DocumentData>
): R => {
  return snapshots.data() as R;
};

export const convertToSlug = (text: string = "") => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

type TPrimitiveKeys<T> = {
  [P in keyof T]: Exclude<T[P], undefined> extends object ? never : P;
}[keyof T];
type TOnlyPrimitives<T> = Pick<T, TPrimitiveKeys<T>>;

export const onlyPrimitives = <T>(obj: T): TOnlyPrimitives<T> => {
  const result: any = {};
  for (const prop in obj) {
    if (typeof obj[prop] !== "object" && typeof obj[prop] !== "function") {
      result[prop] = obj[prop];
    }
  }
  return result;
};
