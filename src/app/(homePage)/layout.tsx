import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative z-50 flex min-h-screen flex-col overflow-hidden bg-background">
      <div className="relative z-50">
        <Header selectedIndex={1} />
      </div>

      <div className="relative z-30">{children}</div>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
