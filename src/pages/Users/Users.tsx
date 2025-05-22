import React, { useEffect, useState } from "react";
import Container from "@/components/helpers/Container";
import axios from "axios";
import { API_ENPOINTS, API_URL } from "@/constants/api";
import UserCardSkeleton from "./components/skeleton/UserCardSkeleton";
import UserCard from "./components/UserCard";
import type { IUser } from "@/types/api";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}${API_ENPOINTS.users}?limit=8`)
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill("")
          .map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
      </div>
    );
  }

  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default React.memo(Users);
