"use client";

import { createContext, useContext } from "react";

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

export function Providers({ children }: { children: React.ReactNode }) {
  return <DeviceProvider>{children}</DeviceProvider>;
}
