import { useState, type FormEvent } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [token, setToken] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    setIsLoading(true);
    setStatusMessage("");
    setStatusType("");
    setToken("");

    try {
      const loginResponse = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });

      const userResponse = await axios.get("https://fakestoreapi.com/users/2");

      setToken(loginResponse.data.token);
      setStatusType("success");
      setStatusMessage(
        `Bem-vindo, ${userResponse.data.name.firstname} ${userResponse.data.name.lastname}`
      );
    } catch (error) {
      setStatusType("error");

      if (axios.isAxiosError(error)) {
        setStatusMessage(
          error.response?.data?.message || "Erro ao autenticar. Verifique suas credenciais."
        );
      } else {
        setStatusMessage("Erro inesperado ao autenticar.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Acesse sua conta</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          <span>Usuário</span>
          <input
            type="text"
            placeholder="Digite seu usuário"
            className="login-input"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label className="login-label">
          <span>Senha</span>
          <input
            type="password"
            placeholder="••••••••"
            className="login-input"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {statusMessage && (
        <p className={`login-status ${statusType}`} aria-live="polite">
          {statusMessage}
        </p>
      )}

      {token && (
        <div className="login-token" aria-live="polite">
          <p className="login-token-label">Token recebido:</p>
          <code className="login-token-value">{token}</code>
        </div>
      )}

      <p className="login-footer">
        Não tem conta? <a href="#">Cadastre-se</a>
      </p>
    </div>
  );
}
