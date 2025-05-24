import React, { useEffect, useState } from "react";
import type { IPost } from "@/types/api";
import { API_ENPOINTS, API_URL } from "@/constants/api";
import axios from "axios";
import PostCard from "./components/PostCard";
import PostCardSkeleton from "./components/skeleton/PostCardSkeleton";
import Container from "@/components/helpers/Container";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}${API_ENPOINTS.posts}?limit=0`)
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill("")
              .map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link to={"/posts/" + post.id} key={post.id}>
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default React.memo(Posts);
