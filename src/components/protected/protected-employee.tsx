// import { useAuthStore } from "@/store/useAuthStore";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

const ProtectedEmployeeRoute = ({ children }: any) => {
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // const isEmployee = useAuthStore((state) => state.isEmployee);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isAuthenticated || !isEmployee) {
  //     router.push("/login");
  //   }
  // }, [isAuthenticated, isEmployee, router]);

  // if (!isAuthenticated || !isEmployee) {
  //   return null;
  // }

  return <>{children}</>;
};

export default ProtectedEmployeeRoute;
