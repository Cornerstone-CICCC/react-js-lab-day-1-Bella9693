import { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";
import type { User } from "./types/User";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<Omit<User, "id">>({
    fullname: "",
    age: 0,
    education: "",
    gender: "",
    skills: [],
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = () => {
    if (editingId === null) {
      setUsers((prev) => [...prev, { id: Date.now(), ...formData }]);
    } else {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingId ? { id: editingId, ...formData } : u
        )
      );
      setEditingId(null);
    }
    handleClear();
  };

  const handleClear = () => {
    setFormData({
      fullname: "",
      age: 0,
      education: "",
      gender: "",
      skills: [],
      bio: "",
    });
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
  };

  const handleEdit = (user: User) => {
    const { id, ...rest } = user;
    setFormData(rest);
    setEditingId(id);
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null);
  };

  return (
    <>
      <UserForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSkillChange={handleSkillChange}
        onSubmit={handleSubmit}
        onClear={handleClear}
      />

      <UserList
        users={users}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserProfile user={selectedUser} />
    </>
  );
};

export default App;
