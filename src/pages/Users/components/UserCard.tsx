import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { IUser } from "@/types/api";

const UserCard = ({ user }: { user: IUser }) => {
  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-col items-center pb-2">
        <Avatar className="h-20 w-20 border-2 border-black">
          <AvatarImage
            src={user.image || "/placeholder.svg"}
            alt={`${user.firstName} ${user.lastName}`}
            className="grayscale"
          />
          <AvatarFallback>
            {user.firstName[0]}
            {user.lastName[0]}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="text-center">
        <h3 className="font-bold text-lg">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-sm text-gray-600 mb-2">@{user.username}</p>
        <p className="text-sm mb-1 truncate">{user.email}</p>
        <p className="text-sm mb-3 truncate">{user.phone}</p>
        <div className="flex justify-center gap-2 mb-2">
          <Badge variant="outline" className="border-black text-xs">
            {user.address.city}
          </Badge>
          <Badge variant="outline" className="border-black text-xs">
            {user.address.state}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-200 bg-gray-50 flex justify-center">
        <p className="text-sm font-medium">
          {user.company.name} - {user.company.department}
        </p>
      </CardFooter>
    </Card>
  );
};

export default React.memo(UserCard);
