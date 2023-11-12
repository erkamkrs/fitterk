"use client"
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html>
      <body>
        <ChakraProvider>
          <AuthContextProvider>
            <Grid
              templateAreas={`
                "header" 
                "main"
                "footer"`}
              minHeight="100vh"
              templateRows="auto 1fr auto"
            >
              <GridItem area={"header"}>
                <Navbar />
              </GridItem>

              <GridItem area={"main"} py={4}>
                <Container w="full" maxW={{base: 'sm', md: 'container.md', lg: 'container.xl'}}>
                  {children}
                </Container>
              </GridItem>

              <GridItem area={"footer"}>
                <Footer />
              </GridItem>
            </Grid>
          </AuthContextProvider>
        </ChakraProvider>
     </body>
    </html>
  );
}