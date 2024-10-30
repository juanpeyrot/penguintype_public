import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../../store/userStore";


interface Props {
	redirectPath?: string;
	children?: ReactNode | ReactNode[];
}

export const ProtectedRoute = ({ children, redirectPath = '/' }: Props) => {

	const { user } = useUserStore();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};