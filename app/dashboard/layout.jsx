import React from "react";
import Header from "./_components/Header";

const dashboardLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default dashboardLayout;
