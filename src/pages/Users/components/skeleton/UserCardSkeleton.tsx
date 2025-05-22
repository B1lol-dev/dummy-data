import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const UserCardSkeleton = () => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-col items-center pb-2">
        <Skeleton className="h-20 w-20 rounded-full" />
      </CardHeader>
      <CardContent className="text-center">
        <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};

export default React.memo(UserCardSkeleton);
