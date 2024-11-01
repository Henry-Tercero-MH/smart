import React, { useState } from "react";
import { Lock } from "lucide-react";
import styles from "./Login.module.css"; // Asegúrate de que la ruta sea correcta

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  darkMode: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, darkMode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className={styles.background}>
      <div
        className={`flex items-center justify-center min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        } background`}
      >
        <div
          className={`px-8 py-6 mt-4 text-left ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          } shadow-lg rounded-lg`}
        >
          <h3 className="text-2xl font-bold text-center flex items-center justify-center">
            <Lock className="mr-2" /> Login
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                    darkMode ? "bg-gray-700 text-white" : "bg-white"
                  }`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                    darkMode ? "bg-gray-700 text-white" : "bg-white"
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
