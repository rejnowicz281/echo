"use client";

import { User } from "@/types/users";
import { FC, createContext, useContext } from "react";

export type ContactsContextType = {
    contacts: User[];
    getContact: (id: string) => User | undefined;
};

export type ContactsProviderProps = {
    children: React.ReactNode;
    contacts: User[];
};

const ContactsContext = createContext<ContactsContextType | null>(null);

export const ContactsProvider: FC<ContactsProviderProps> = ({ children, contacts }) => {
    const getContact = (id: string) => contacts.find((contact) => contact.id === id);

    return (
        <ContactsContext.Provider
            value={{
                contacts,
                getContact,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
};

const useContactsContext = () => {
    const context = useContext(ContactsContext);

    if (!context) throw new Error("useContactsContext must be used within a ContactsContext Provider");

    return context;
};

export default useContactsContext;
