import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold">404</h1>
      <p className="text-xl mt-4">The page you looking for is not found.</p>
      <Link to="/">
        <Button
          type="button"
          className="px-4 py-3 text-xl text-white rounded-md mt-5"
        >
          Go to home
        </Button>
      </Link>
    </div>
  );
};

export default React.memo(ErrorPage);
