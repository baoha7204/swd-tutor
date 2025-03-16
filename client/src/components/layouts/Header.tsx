import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserType } from "@/contexts/auth.context";

type HeaderProps = {
  currentUser: UserType | null;
  logout: () => Promise<void>;
};

const Header = ({ logout, currentUser }: HeaderProps) => {
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out!");
    } catch {
      toast.error("Failed to log out");
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4 gap-4">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/tutor-logo.svg"
              alt="MathGenius Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-[#2563EB]">MathGenius</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {currentUser && (
              <>
                <Link
                  to="/dashboard"
                  className="text-[#4B5563] hover:text-[#2563EB]"
                >
                  Dashboard
                </Link>
                <Link
                  to="/review"
                  className="text-[#4B5563] hover:text-[#2563EB]"
                >
                  Review
                </Link>
              </>
            )}
            <Link to="/topics" className="text-[#4B5563] hover:text-[#2563EB]">
              Topics
            </Link>
            {/* <Link
              to="/community"
              className="text-[#4B5563] hover:text-[#2563EB]"
            >
              Community
            </Link> */}
          </nav>
        </div>

        {/* Navigation */}

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                  />
                  <AvatarFallback className="bg-[#2563EB] text-white">
                    {getUserInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <User size={14} />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#2563EB] hover:bg-blue-700">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
