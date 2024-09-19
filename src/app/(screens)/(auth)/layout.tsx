// import { useAuthStore } from "@/store/useAuthStore";

export default function Layout({children}: {children: React.ReactNode}) {
    // const { session } = useAuthStore();
    // if(session) return null;
    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-10">
            {children}
        </div>
    );
}