import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_ENPOINTS, API_URL } from "@/constants/api";
import type { IUser } from "@/types/api";
import axios from "axios";
import { ArrowLeft, Briefcase, Mail, MapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

async function getUser(id: string) {
  try {
    const res = await axios.get(`${API_URL}${API_ENPOINTS.users}/${id}`);
    if (res.status !== 200) return null;
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

async function getUserPosts(id: string) {
  try {
    const res = await axios.get(
      `${API_URL}${API_ENPOINTS.posts}/user/${id}?limit=3`
    );
    if (res.status !== 200) return { posts: [] };
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

const User = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>();
  const [userPosts, setUserPosts] = useState<{
    posts: {
      id: number;
      title: string;
      body: string;
    }[];
  }>();

  useEffect(() => {
    if (!params.id) {
      navigate("/404");
      return;
    }
    getUser(params.id).then((data) => {
      if (!data) {
        navigate("/404");
      } else {
        setUser(data);
      }
    });

    getUserPosts(params.id)
      .then((data) => {
        setUserPosts(data);
      })
      .catch((err) => {
        console.error("Error fetching user posts:", err);
        navigate("/404");
      });
  }, [params.id, navigate]);

  return (
    <main className="container mx-auto py-10 px-4">
      <Link to="/" className="flex items-center text-sm mb-8 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to cards
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="border border-gray-200">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 border-2 border-black mb-4">
                  <AvatarImage
                    src={user?.image || "/placeholder.svg"}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className="grayscale"
                  />
                  <AvatarFallback>
                    {user?.firstName[0]}
                    {user?.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold mb-1">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-gray-500 mb-2">@{user?.username}</p>
                <Badge className="mb-4">{user?.company.name}</Badge>

                <Button className="w-full mb-2 bg-black hover:bg-gray-800">
                  Connect
                </Button>
                <Button variant="outline" className="w-full border-black">
                  Message
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-gray-500">{user?.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-gray-500">
                      {user?.address.city}, {user?.address.state}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-sm text-gray-500">
                      {user?.company.name} - {user?.company.department}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="pt-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">
                    Profile Information
                  </h2>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Full Name
                      </p>
                      <p>
                        {user?.firstName} {user?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Birth Date
                      </p>
                      <p>
                        {user?.birthDate
                          ? new Date(user.birthDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Gender
                      </p>
                      <p>{user?.gender}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <h2 className="text-xl font-bold mb-4">Bank Information</h2>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Card Type
                      </p>
                      <p>{user?.bank.cardType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Card Number
                      </p>
                      <p>**** **** **** {user?.bank.cardNumber.slice(-4)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Currency
                      </p>
                      <p>{user?.bank.currency}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">IBAN</p>
                      <p>{user?.bank.iban}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="posts" className="pt-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
                  {userPosts?.posts && userPosts?.posts.length > 0 ? (
                    <div className="space-y-6">
                      {userPosts?.posts?.map((post) => (
                        <Link to={"/posts/" + post.id} key={post.id}>
                          <div className="border-b-1 border-gray-200 pb-6 last:border-0">
                            <h3 className="font-bold mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-3">{post.body}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No posts found for this user.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity" className="pt-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-black mt-2 mr-3"></div>
                        <div>
                          <p className="font-medium">
                            {
                              [
                                "Commented on a post",
                                "Liked a photo",
                                "Updated profile information",
                                "Shared an article",
                                "Connected with a user",
                              ][i]
                            }
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(
                              Date.now() - i * 86400000
                            ).toLocaleDateString()}{" "}
                            at{" "}
                            {new Date(
                              Date.now() - i * 86400000
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default React.memo(User);
