import { Injectable } from "@angular/core";
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { EntryExit } from "../models/entry-exit.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class EntryExitService {
  constructor(private db: Firestore, private authService: AuthService) {}

  createEntryExit(entryExit: EntryExit) {
    const uid = this.authService.user.uid;
    const prueba = collection(this.db, uid);
    return addDoc(collection(prueba, "entry-exit", "items"), entryExit);
  }

  initEntryExitListener(uid: string) {
    return new Observable(observer => {
      onSnapshot(collection(this.db, uid, "entry-exit", 'items'), ({ docs }) => {
        const items = docs.map( doc => ({uid: doc.id, ...doc.data()}) );
        observer.next(items);
      });
    })
  }

  deleteEntryExit(uid: string) {
    const user = this.authService.user.uid;
    const docEntryExit = doc(this.db, `${user}/entry-exit`);
    const items = collection(docEntryExit, 'items');
    const docRef = doc(items, uid);
    return deleteDoc(docRef);
  }
}
