// import { useAuthStore } from "@/store/useAuthStore";

export default function Layout({children}: {children: React.ReactNode}) {
    // const { session } = useAuthStore();
    // if(session) return null;
    return (
      <div className="min-h-screen h-full w-full flex flex-col items-center justify-center p-10  dark:bg-grid-white/[0.2] bg-grid-black/[0.02]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
        {children}
      </div>
    );
}