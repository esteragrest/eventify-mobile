// import { Forbidden, NotFound } from "../../pages";

export interface PrivateContentProps {
  error?: string;
  children: React.ReactNode;
}

export const PrivateContent = ({ error, children }: PrivateContentProps) => {
  if (error && error.includes("Forbidden")) {
    return "forbidden";
    // return <Forbidden message={error} />;
  }

  if (error && error.toLowerCase().includes("not found")) {
    //TODO: добавить страницы
    return "not found";
    // return <NotFound />;
  }

  return <>{children}</>;
};
