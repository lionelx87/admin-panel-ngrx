import { Injectable } from "@angular/core";
import { UserRegister } from "../models/user.model";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
} from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private authFirebase: Auth) {}

  createUser(user: UserRegister) {
    console.log(user);
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, user.email, user.password);
  }
}

// createUser(user: UserRegister) {
//   console.log(user);
//   const auth = getAuth();
//   return signInWithEmailAndPassword(auth, user.email, user.password);
// }
