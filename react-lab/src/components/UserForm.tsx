import type React from "react";
import type { User } from "../types/User";

interface UserFormProps {
  formData: Omit<User, "id">;
  editingId: number | null;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onSkillChange: (skill: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

const skillsList = ["TypeScript", "React", "Node", "NoSQL"];

const UserForm = ({
  formData,
  editingId,
  onChange,
  onSkillChange,
  onSubmit,
  onClear,
}: UserFormProps) => {
  return (
    <fieldset>
      <legend>User Form</legend>

      <input
        name="fullname"
        placeholder="Full Name"
        value={formData.fullname}
        onChange={onChange}
      />

      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={onChange}
      />

      <select name="education" value={formData.education} onChange={onChange}>
        <option value="">Select education</option>
        <option value="Grade school">Grade school</option>
        <option value="High school">High school</option>
        <option value="College">College</option>
      </select>

      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={onChange}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={onChange}
          />
          Female
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={formData.gender === "Other"}
            onChange={onChange}
          />
          Other
        </label>
      </div>

      <div>
        {skillsList.map((skill) => (
          <label key={skill}>
            <input
              type="checkbox"
              checked={formData.skills.includes(skill)}
              onChange={() => onSkillChange(skill)}
            />
            {skill}
          </label>
        ))}
      </div>

      <textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={onChange}
      />

      <div>
        <button onClick={onSubmit}>
          {editingId ? "Save User" : "Add User"}
        </button>
        <button onClick={onClear}>Clear</button>
      </div>
    </fieldset>
  );
};

export default UserForm;
