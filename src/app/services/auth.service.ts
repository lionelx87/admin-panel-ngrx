import { Injectable } from "@angular/core";
import { UserLogin, UserRegister } from "../models/user.model";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private authFirebase: Auth) {}

  initAuthListener() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user);
    });
  }

  createUser(user: UserRegister) {
    console.log(user);
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, user.email, user.password);
  }

  login(user: UserLogin) {
    console.log(user);
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, user.email, user.password);
  }

  logout() {
    const auth = getAuth();
    return signOut(auth);
  }
}
