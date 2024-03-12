import AddPostButton from "@/components/posts/add-post-button";
import CurrentUser from "./current-user";
import DiscoverLink from "./links/discover-link";
import FriendsLink from "./links/friends-link";
import HomeLink from "./links/home-link";
import MessagesLink from "./links/messages-link";
import ProfileLink from "./links/profile-link";
import UsersLink from "./links/users-link";
import ShowMoreButton from "./show-more-button";
import SignOutButton from "./sign-out-button";
import TogglePresenceButton from "./toggle-presence-button";

const MainSidebar = () => {
    return (
        <div className="lg:px-16 lg:py-12 lg:border-r lg:border-r-gray-100 lg:flex-1 lg:flex-col lg:flex lg:gap-12">
            <div className="hidden lg:flex lg:flex-col">
                <CurrentUser />
            </div>
            <div className="hidden lg:flex lg:flex-col lg:gap-3">
                <SignOutButton />
                <TogglePresenceButton />
                <AddPostButton />
            </div>
            <div className="flex lg:flex-col lg:gap-5">
                <HomeLink />
                <DiscoverLink />
                <div className="hidden lg:block">
                    <ProfileLink />
                </div>
                <MessagesLink />

                <FriendsLink />

                <div className="hidden lg:block">
                    <UsersLink />
                </div>
                <ShowMoreButton />
            </div>
        </div>
    );
};

export default MainSidebar;
