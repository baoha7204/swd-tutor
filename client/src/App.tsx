import Router from "./router";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/auth.context";

function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
