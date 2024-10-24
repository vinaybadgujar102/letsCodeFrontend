import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/problems");
    } catch (error) {
      console.error("Failed to log in with Google:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome to LetsCode
        </h2>
        <p className="text-gray-300 mb-8 text-center">
          Sign in to start solving coding challenges
        </p>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-md flex items-center justify-center gap-3 transition-colors"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
