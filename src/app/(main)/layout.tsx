import React from "react";

const MainLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return <div className="flex flex-col p-20 h-screen w-screen">{children}</div>;
};

export default MainLayout;
