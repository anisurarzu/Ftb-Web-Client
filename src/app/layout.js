import { Exo_2 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AuthProvider } from "@/context/AuthContext"; // Import AuthProvider
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: {
    default: "Fasttrack Booking",
    template: "%s | Car Doctor",
  },
  description: "Fasttrack Booking",
};

// Configure Exo 2 font
const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo-2",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={exo2.variable}>
      <body className={exo2.variable}>
        <AuthProvider>
          {" "}
          {/* Wrap your entire app with AuthProvider */}
          <Navbar className={exo2.variable} />
          {children}
          <Footer className={exo2.variable} />
        </AuthProvider>
      </body>
    </html>
  );
}
