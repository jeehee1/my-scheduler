import { useSearchParams } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import LogIn from "../components/auth/LogIn";

const Authentication = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return isLogin ? <SignUp /> : <LogIn />;
};

// export const action = async (req: Request) => {
//   const searchParams = new URL(req.url).searchParams;
//   const mode = searchParams.get("mode") || "login";

//   if (mode !== "login" && mode !== "signup") {
//     console.log("mode가 전달되지 않았습니다");
//     return;
//   }

//   const data = await req.formData();
//   const authData: { email: string; pwd: string } = {
//     email: data.get("email")?.toString() || "",
//     pwd: data.get("pwd")?.toString() || "",
//   };
// };

export default Authentication;
