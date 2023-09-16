import AuthForm from "../components/auth/AuthForm";
import { redirect } from "react-router-dom";
import {
  firebaseAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../config/firebase";

const Authentication = () => {
  return <AuthForm />;
};

export const action = async ({ request }: { request: Request }) => {
  try {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get("mode") || "login";

    if (mode !== "login" && mode !== "signup") {
      console.log("mode가 전달되지 않았습니다");
      return;
    }

    const data = await request.formData();
    const authData: { email: string; pwd: string } = {
      email: data.get("email")?.toString() || "",
      pwd: data.get("pwd")?.toString() || "",
    };

    const userCredential =
      mode === "signup"
        ? await createUserWithEmailAndPassword(
            firebaseAuth,
            authData.email,
            authData.pwd
          )
        : await signInWithEmailAndPassword(
            firebaseAuth,
            authData.email,
            authData.pwd
          );
    const uid = userCredential.user.uid;
    localStorage.setItem("token", uid);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/schedules/daily");
  } catch (e) {
    return e;
  }
};

export default Authentication;
