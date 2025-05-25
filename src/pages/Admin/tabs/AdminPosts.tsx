import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Heart,
  Flag,
  EyeClosed,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IPost } from "@/types/api";
import TabLoader from "../components/TabLoader";
import axios from "axios";
import { API_ENPOINTS, API_URL } from "@/constants/api";
import toast from "react-hot-toast";

const getReactionCount = (
  reactions: number | { likes: number; dislikes: number }
) => {
  return typeof reactions === "object" ? reactions.likes || 0 : reactions;
};

const AdminPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [originalPosts, setOriginalPosts] = useState<IPost[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}${API_ENPOINTS.posts}?limit=0`)
      .then((res) => {
        setPosts(res.data.posts);
        setOriginalPosts(res.data.posts);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        toast.error("Failed to load posts");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    toast.success("Post deleted successfully");
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setPosts(originalPosts);
      return;
    }

    setPosts((prev) =>
      prev.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) &&
          post.body.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  if (loading) {
    return <TabLoader />;
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Posts</h1>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Post Management</h2>
            <p className="text-gray-600">Manage user posts and content</p>
          </div>
          <Button className="bg-black hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>

        <Card className="border border-gray-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Posts ({posts.length})</CardTitle>
                <CardDescription>Manage user-generated content</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search posts..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    handleSearch();
                  }}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Post</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Reactions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <PostTable
                    post={post}
                    key={post.id}
                    onDelete={() => handleDelete(post.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
};

export default React.memo(AdminPosts);

function PostTable({ post, onDelete }: { post: IPost; onDelete?: () => void }) {
  const [hide, setHide] = useState(false);

  const toggleHide = () => {
    if (hide) {
      setHide(false);
      toast.success(`Post "${post.title}" is now visible`);
    } else {
      setHide(true);
      toast.success(`Post "${post.title}" is now hidden`);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div className="max-w-xs">
          <div className="font-medium truncate">{post.title}</div>
          <div className="text-sm text-gray-500">ID: {post.id}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="max-w-xs">
          <p className="text-sm line-clamp-2">{post.body}</p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1 max-w-xs">
          {post.tags.slice(0, 2).map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs border-black"
            >
              #{tag}
            </Badge>
          ))}
          {post.tags.length > 2 && (
            <Badge variant="outline" className="text-xs border-gray-300">
              +{post.tags.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <Heart className="h-4 w-4 text-red-500 mr-1" />
          <span>{getReactionCount(post.reactions)}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          className={
            Math.random() > 0.1
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {Math.random() > 0.1 ? "Published" : "Flagged"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={toggleHide}>
            {!hide ? (
              <Eye className="size-4" />
            ) : (
              <EyeClosed className="size-4" />
            )}
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Flag className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
