import { Injectable } from "@angular/core";
import { Firestore, addDoc, collection, doc, getDoc, onSnapshot } from "@angular/fire/firestore";
import { EntryExit } from "../models/entry-exit.model";
import { AuthService } from "./auth.service";
import { getAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

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
}
