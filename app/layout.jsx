"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <AuthContextProvider>       
            <Navbar/>
            {children} 
            <Footer />
          </AuthContextProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}