import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative z-50 flex min-h-screen flex-col overflow-hidden bg-background">
      <div className="relative z-30">{children}</div>
    </div>
  );
};

export default Layout;
