import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto p-4">
        <Outlet /> {/* 여기에 각 페이지가 렌더링됩니다 */}
      </main>
    </div>
  );
}
