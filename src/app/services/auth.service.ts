import { Injectable } from "@angular/core";
import { UserLogged, UserLogin, UserRegister } from "../models/user.model";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "@angular/fire/auth";
import {
  Firestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { setUser } from "../auth/auth.actions";
import { unSetUser } from "../auth/auth.actions";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _user: UserLogged;

  constructor(
    private authFirebase: Auth,
    private db: Firestore,
    private store: Store<AppState>
  ) {}

  get user() {
    return { ...this._user };
  }

  initAuthListener() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(this.db, user?.uid, "user"), (doc) => {
          const data = doc.data();
          const userLogged: UserLogged = {
            uid: data.uid,
            name: data.name,
            email: data.email,
          };
          this._user = userLogged;
          this.store.dispatch(setUser({ user: userLogged }));
        });
      } else {
        this._user = null;
        this.store.dispatch(unSetUser());
      }
    });
  }

  createUser(user: UserRegister) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, user.email, user.password).then(
      (fbUser: any) => {
        const newUser: UserLogged = {
          uid: fbUser.user.uid,
          name: user.name,
          email: fbUser.user.email,
        };

        return setDoc(doc(this.db, fbUser.user.uid, "user"), newUser); // doc(instance, collection, document)

        // return addDoc(collection(this.db, `${fbUser.user.uid}/user`), newUser);
      }
    );
  }

  login(user: UserLogin) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, user.email, user.password);
  }

  logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  isAuth() {
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
  }
}
