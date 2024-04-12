import { create } from "zustand";

interface Responsive {
  isDesktop: boolean;
  isLaptop: boolean;
  isMobile: boolean;
  setWindowSize: (width: number) => void;
}

export const useResponsiveStore = create<Responsive>((set) => ({
  isDesktop: false,
  isLaptop: false,
  isMobile: false,
  setWindowSize: (width: number) => {
    set({
      isDesktop: width >= 1920,
      isLaptop: width >= 1020 && width < 1920,
      isMobile: width < 1020 && width >= 360,
    });
  },
}));
