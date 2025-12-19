import React from "react";
import type { User } from "../types/User";

interface Props {
  user: User | null;
}

const UserProfile = ({ user }: Props) => {
  if (!user) return <h2>Select a user</h2>;

  return (
    <>
      <p>Full Name: {user.fullname}</p>
      <p>Age: {user.age}</p>
      <p>Education: {user.education}</p>
      <p>Gender: {user.gender}</p>
      <p>Skills: {user.skills.join(",")}</p>
      <p>Bio: {user.bio}</p>
    </>
  );
};

export default UserProfile;
