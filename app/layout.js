import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Toasters from "./toaster";

export const metadata = {
  title: "File Management System",
  description: "System for storing files",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Toasters />
          {session && <Navbar />}
          <div className="flex">
            <div>{session && <Sidebar />}</div>
            <div className="container m-10">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
