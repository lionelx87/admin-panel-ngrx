import { Injectable } from "@angular/core";
import { Firestore, addDoc, collection } from "@angular/fire/firestore";
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
}
