import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex justify-center items-center bg-[#2c5536] text-gray-100 h-40">
      ⓒ 2025.{" "}
      <Link to="/hidden-game" className="cursor-text">
        SSD.
      </Link>{" "}
      All rights reserved.
    </div>
  );
}
