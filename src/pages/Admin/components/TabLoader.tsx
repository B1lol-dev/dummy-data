import { Loader } from "@/components/ui/loader";
import React from "react";

const TabLoader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader variant="circular" className="scale-200" />
    </div>
  );
};

export default React.memo(TabLoader);
