import { NavLink } from "react-router-dom";

export default function NavBar() {
  const base = "px-3 py-2 rounded-md text-sm font-medium";
  const active = "bg-black text-white";
  const idle = "bg-white border border-gray-300 text-gray-800";

  return (
    <header className="w-full border-b bg-white/60 backdrop-blur">
      <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-2">
        <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
          Home
        </NavLink>

        <NavLink to="/notices" className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
          공지사항
        </NavLink>
      </nav>
    </header>
  );
}
