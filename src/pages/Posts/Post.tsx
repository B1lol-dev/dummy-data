import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import type { IUser, IPost } from "@/types/api";
import axios from "axios";
import { API_ENPOINTS, API_URL } from "@/constants/api";
import { auth } from "@/utils/auth";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

interface IComment {
  comments: {
    id: number | string;
    user: {
      username: string;
      id: number;
    };
    body: string;
  }[];
}

async function getPost(id: string) {
  try {
    const res = await axios.get(`${API_URL}${API_ENPOINTS.posts}/${id}`);
    if (res.status !== 200) return null;
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

async function getUser(id: number) {
  try {
    const res = await axios.get(`${API_URL}${API_ENPOINTS.users}/${id}`);
    if (res.status !== 200) return null;
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

async function getComments(postId: string) {
  try {
    const res = await axios.get(`${API_URL}/comments/post/${postId}`);
    if (res.status !== 200) return { comments: [] };
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

const Post = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<IComment>();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    getPost(params.id as string).then((data) => {
      if (!data) {
        navigate("/404");
      } else {
        setPost(data);
        return getUser(data.userId);
      }
    });

    getComments(params.id as string).then((data) => setComments(data));

    getUser(post?.userId as number).then((data) => setUser(data));
  }, [params.id, post?.userId, navigate]);

  const [newComment, setNewComment] = useState("");
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!auth.token.trim()) {
      console.error("User is not authenticated");
      toast.error("You must be logged in to comment.");
      return;
    }

    auth
      .getMyInfo()
      .then((data) => {
        console.log(data);
        const newCommentData = {
          id: uuidv4(),
          user: {
            username: data.username,
            id: data.id,
          },
          body: newComment,
        };

        setComments((prev) => {
          return {
            comments: [...(prev?.comments || []), newCommentData],
          };
        });

        setNewComment("");
      })
      .catch((err) => {
        console.error("Error creating new comment:", err);
        toast.error(err.message);
      });
  };

  return (
    <main className="container mx-auto py-10 px-4">
      <Link to="/" className="flex items-center text-sm mb-8 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to cards
      </Link>

      <div className="max-w-3xl mx-auto">
        <Card className="border border-gray-200 mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              {user && (
                <div className="flex items-center gap-3">
                  <Avatar className="border border-gray-300">
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
                  <div>
                    <p className="font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">{post?.title}</h1>
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {post?.body}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post?.tags?.map((tag: string, i: number) => (
                <Badge key={i} variant="outline" className="border-black">
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-200 bg-gray-50 flex justify-between">
            <Button variant="ghost" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>
                {typeof post?.reactions === "object"
                  ? post?.reactions.likes || 0
                  : post?.reactions}{" "}
                Likes
              </span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{comments?.comments?.length || 0} Comments</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </CardFooter>
        </Card>

        <div>
          <h2 className="text-xl font-bold mb-4">
            Comments ({comments?.comments?.length || 0})
          </h2>

          <div className="flex gap-3 mb-6">
            {user && (
              <Avatar className="h-10 w-10 border border-gray-300">
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
            )}
            <form className="flex-1" onSubmit={handleAddComment}>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Write a comment..."
                rows={3}
                onChange={(e) => setNewComment(e.target.value)}
                required
                value={newComment}
              />
              <div className="flex justify-end mt-2">
                <Button type="submit" className="bg-black hover:bg-gray-800">
                  Post Comment
                </Button>
              </div>
            </form>
          </div>

          {/* comments */}
          <div className="space-y-6">
            {comments?.comments && comments?.comments.length > 0 ? (
              comments?.comments.map((comment) => (
                <Link to={`/users/${comment.user.id}`} key={comment.id}>
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10 border border-gray-300">
                      <AvatarFallback>
                        {comment.user.username.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="font-medium text-sm">
                          {comment.user.username}
                        </p>
                        <p className="text-gray-700 mt-1">{comment.body}</p>
                      </div>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <button className="hover:text-black">Like</button>
                        <button className="hover:text-black">Reply</button>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center py-6">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default React.memo(Post);
