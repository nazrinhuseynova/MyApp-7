import React, { createContext, useContext, useState } from "react";

type User = {
  id: string;
  name: string;
  approved: boolean;
};

type UsersContextType = {
  appUsers: User[];
  handleApprove: (id: string) => void;
  updateUser: (id: string, name: string) => void;
};

const users: User[] = [
  { id: "1", name: "Elvin", approved: false },
  { id: "2", name: "Leyla", approved: false },
  { id: "3", name: "Murad", approved: false },
];

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [appUsers, setAppUsers] = useState<User[]>(users);

  const handleApprove = (id: string) => {
    console.log("ID", id);

    setAppUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, approved: true } : user,
      ),
    );
  };

  const updateUser = (id: string, name: string) => {
    setAppUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, name } : user)),
    );
  };

  return (
    <UsersContext.Provider value={{ appUsers, handleApprove, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers must be used inside UsersProvider");
  }

  return context;
}
