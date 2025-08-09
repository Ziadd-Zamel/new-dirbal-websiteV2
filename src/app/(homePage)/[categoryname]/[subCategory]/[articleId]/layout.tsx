import Navbar from "@/components/layout/header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative z-50 flex min-h-screen flex-col overflow-hidden bg-[#161D27]">
      <div className="relative z-50">
        <Navbar selectedIndex={1} />
      </div>

      <div className="relative z-20 -mb-20">{children}</div>
    </div>
  );
};

export default Layout;
