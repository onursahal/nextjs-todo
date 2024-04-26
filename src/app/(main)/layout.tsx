import React from "react";

const MainLayout = ({
  children,
  params,
}: {
  children: Readonly<React.ReactNode>;
  params: any;
}) => {
  console.log({ params });
  return <div className="flex flex-col p-20 h-screen">{children}</div>;
};

export default MainLayout;
