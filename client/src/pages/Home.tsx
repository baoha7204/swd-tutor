import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-6">Welcome to MathGenius</h1>

      {currentUser ? (
        <div className="text-center">
          <p className="text-xl">Welcome back, {currentUser.name}!</p>
          <p className="mt-2 text-[#4B5563]">
            Continue your learning journey from where you left off.
          </p>
        </div>
      ) : (
        <div className="text-center max-w-md">
          <p className="text-xl">Your personal AI math tutor</p>
          <p className="mt-2 text-[#4B5563]">
            Sign up to start improving your mathematical skills with
            personalized lessons, practice exercises, and AI assistance.
          </p>
        </div>
      )}
    </div>
  );
}
