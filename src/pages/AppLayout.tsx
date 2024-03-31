import { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppProvider from "../context/AppContext";

const AppLayout = ({ children }: Props): JSX.Element => {
  return (
    <AppProvider>
      <main className="relative flex min-h-screen flex-col bg-gradient-to-r from-cyan-500 to-blue-500">
        <Header />
        <div className="flex-1 flex-grow">{children}</div>
        <Footer />
      </main>
    </AppProvider>
  );
};

interface Props {
  children: ReactNode;
}

export default AppLayout;
