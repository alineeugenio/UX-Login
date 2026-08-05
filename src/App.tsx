import "./App.css";

export default function App() {
  return (
    <div className="login-container">
      <h1 className="login-title">Acesse sua conta</h1>
      <form className="login-form">
        <label className="login-label">
          <span>Usuário</span>
          <input
            type="text"
            placeholder="Digite seu usuário"
            className="login-input"
            autoComplete="username"
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
            required
          />
        </label>
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
      <p className="login-footer">
        Não tem conta? <a href="#">Cadastre-se</a>
      </p>
    </div>
  );
}
