import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Construction } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Wip = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4">
        <Link to="/" className="flex items-center text-sm mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>

      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white rounded-full border-2 border-gray-200 shadow-sm">
            <Construction className="h-12 w-12 text-gray-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Work in Progress</h1>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          We're actively developing new features and improvements. Here's what
          we're working on and what's coming next.
        </p>
        <div className="flex justify-center">
          <Badge className="bg-black text-white text-sm px-4 py-2">
            57% Complete
          </Badge>
        </div>
      </div>
    </main>
  );
};

export default React.memo(Wip);
