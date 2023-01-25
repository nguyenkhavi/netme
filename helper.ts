import { DocumentData, QuerySnapshot } from "firebase/firestore";

export const formatListDocument = <R extends any[]>(
  snapshots: QuerySnapshot<DocumentData>
): R => {
  return snapshots.docs.map((doc) => doc.data()) as R;
};
