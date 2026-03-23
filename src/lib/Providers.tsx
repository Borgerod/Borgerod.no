"use client";

import { createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

//? forgot where this is used again, is it still in use?
type Device = "mobile" | "tablet" | "desktop";
function getDevice(): Device {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua))
    return "mobile";
  return "desktop";
}

const DeviceContext = createContext<Device>("desktop");

function DeviceProvider({ children }: { children: React.ReactNode }) {
  return (
    <DeviceContext.Provider value={getDevice()}>
      {children}
    </DeviceContext.Provider>
  );
}

export const useDevice = () => useContext(DeviceContext);
/* this is related to background restructuring, read note in Layout */
function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.setAttribute(
      "data-page",
      pathname === "/" ? "home" : "other",
    );
  }, [pathname]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DeviceProvider>
      <BackgroundProvider>{children}</BackgroundProvider>
    </DeviceProvider>
  );
}
