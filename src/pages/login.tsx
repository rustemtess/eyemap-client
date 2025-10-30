import { useState } from "react";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // отменяем перезагрузку формы
    setError(null);

    try {
      const response = await fetch("http://localhost/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Ошибка авторизации");
      }

      const data = await response.json();
      console.log("Ответ сервера:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/admin"; // редирект
      } else {
        setError("Токен не получен");
      }

    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen flex justify-center items-center">
      <form
        onSubmit={fetchLogin}
        className="flex flex-col gap-2 p-4 max-w-[320px] w-full flex flex-col items-center"
      >
        <img src={logo} width={80} className="my-2" />
        <input
          className="w-full bg-white p-3 px-5 rounded-full text-sm"
          placeholder="Введите электронную почту"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full bg-white p-3 px-5 rounded-full text-sm"
          placeholder="Введите пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#5d7388] text-white text-sm p-3 rounded-full w-full"
        >
          Войти
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
