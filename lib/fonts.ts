import localFont from "next/font/local";

export const sans = localFont({
  src: [
    {
      path: "../assets/BRSonoma-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/BRSonoma-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/BRSonoma-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--sans",
});
