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
