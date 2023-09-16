import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import ShowError from "../components/error/ShowError";
import AuthNavigation from "../components/navigation/AuthNavigation";
import TypeNavigation from "../components/navigation/TypeNavigation";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "Error";
  let message = "페이지를 불러올 수 없습니다";

  if (isRouteErrorResponse(error)) {
    if (error.status === 500) {
      message = error.error!.message;
    }
    if (error.status === 404) {
      title = error.statusText;
      message = "페이지를 찾을 수 없습니다";
    }
    if (error.status === 405) {
      title = error.statusText;
      message = "잘못된 메소드 요청입니다";
    }
    if (error.status === 402) {
      title = error.statusText;
      message = "접근 권한이 없습니다";
    }
  }

  console.log(error);

  return (
    <main>
      <AuthNavigation />
      <TypeNavigation />
      <ShowError title={title}>
        <p>{message}</p>
      </ShowError>
    </main>
  );
};

export default ErrorPage;
