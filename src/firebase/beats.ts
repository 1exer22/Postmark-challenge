import { db } from "./config";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  getDocs,
} from "firebase/firestore";
import type { Beat } from "../types/Beat";

export const getBeat = async (id: string): Promise<Beat | null> => {
  try {
    const beatDoc = await getDoc(doc(db, "beats", id));
    if (beatDoc.exists()) {
      return { id: beatDoc.id, ...beatDoc.data() } as Beat;
    }
    return null;
  } catch (error) {
    console.error("Error fetching beat:", error);
    return null;
  }
};

export const createBeat = async (
  beat: Omit<Beat, "id">
): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, "beats"), beat);
    return docRef.id;
  } catch (error) {
    console.error("Error creating beat:", error);
    return null;
  }
};

export const getLatestBeats = async (limit = 5): Promise<Beat[]> => {
  try {
    const q = query(collection(db, "beats"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          created: data.created?.toDate
            ? data.created.toDate().toISOString()
            : data.created,
        } as Beat;
      })
      .filter((beat) => beat.created)
      .sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      )
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching latest beats:", error);
    return [];
  }
};
