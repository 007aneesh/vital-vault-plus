import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const Logout = () => {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push("/");
  }, []);

  return null;
};

export default Logout;
