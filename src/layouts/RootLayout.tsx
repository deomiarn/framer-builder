import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 border-b border-border flex items-center gap-4">
        <NavLink to="/" className="font-semibold">
          BlockForge
        </NavLink>
        <nav className="flex gap-4 text-sm">
          <NavLink
            to="/elements"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-muted-foreground"
            }
          >
            Elements
          </NavLink>
          <NavLink
            to="/coloring"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-muted-foreground"
            }
          >
            Coloring
          </NavLink>
        </nav>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
