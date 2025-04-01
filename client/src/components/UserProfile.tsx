import React, { useEffect, useState } from "react";
import { fetchUserData } from "../services/api";

interface UserProfileProps {
  userId: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    fetchUserData(userId).then(setUser).catch(console.error);
  }, [userId]);

  if (!user) return <div>Loading...</div>;
  return <div>User: {user.name}</div>;
};
