import React from "react";
import type { IPost } from "@/types/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Glasses, Heart, MessageSquare, Share2 } from "lucide-react";

const PostCard = ({ post }: { post: IPost }) => {
  return (
    <Card className="border border-gray-200 flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Avatar className="border border-gray-300">
            <AvatarImage src="" alt="Anonymus" className="grayscale" />
            <AvatarFallback>
              <Glasses />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">Anonymus</p>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-base mb-2 line-clamp-1">
          {post.title}
        </CardTitle>
        <p className="text-sm text-gray-600 line-clamp-4 mb-3">{post.body}</p>
      </CardContent>
      <CardFooter className="border-t border-gray-200 bg-gray-50 flex justify-between">
        <button className="flex items-center gap-1 text-xs">
          <Heart className="h-4 w-4" />
          <span>
            {typeof post.reactions === "object"
              ? post.reactions.likes || 0
              : post.reactions}
          </span>
        </button>
        <button className="flex items-center gap-1 text-xs">
          <MessageSquare className="h-4 w-4" />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-1 text-xs">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </CardFooter>
    </Card>
  );
};

export default React.memo(PostCard);
