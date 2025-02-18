import { createContext, useContext, useState, ReactNode } from "react";

interface UserSelectionContextType {
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
}

const UserSelectionContext = createContext<UserSelectionContextType | undefined>(undefined);

export const UserSelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  return (
    <UserSelectionContext.Provider value={{ selectedUsers, setSelectedUsers }}>
      {children}
    </UserSelectionContext.Provider>
  );
};

export const useUserSelection = () => {
  const context = useContext(UserSelectionContext);
  if (!context) {
    throw new Error("useUserSelection must be used within a UserSelectionProvider");
  }
  return context;
};
