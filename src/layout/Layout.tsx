import Header from "@/components/layout/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default React.memo(Layout);
