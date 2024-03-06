import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { Dispatch, FC, SetStateAction, useState } from "react";

type ContactSearchProps = {
    setSearchQuery: Dispatch<SetStateAction<string>>;
    searchQuery: string;
    contactsCount: number;
};

const ContactSearch: FC<ContactSearchProps> = ({ setSearchQuery, searchQuery, contactsCount }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="cursor-text text-lg flex items-center" onClick={() => setIsSearchOpen(true)}>
            {isSearchOpen ? (
                <input
                    autoFocus
                    className="outline-none flex-1 p-4 text-lg w-full"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    onBlur={(e) => {
                        if (e.target.value === "") setIsSearchOpen(false);
                    }}
                />
            ) : (
                <div className="flex-1 p-4">
                    Contacts <span className="text-gray-500">({contactsCount})</span>
                </div>
            )}

            <FiSearch className="flex-shrink-0 mr-5" />
        </div>
    );
};

export default ContactSearch;
