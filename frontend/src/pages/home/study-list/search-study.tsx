import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRef, useState } from "react";

interface SearchStudyProps {
  onSearch: (result: string) => void;
}

export default function SearchStudy({ onSearch }: SearchStudyProps) {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  // 엔터 키 입력 후 검색창 초기화
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (query === "") {
        alert("검색어를 입력해주세요");
        return;
      }

      // 검색어를 상위 컴포넌트로 보냄
      onSearch(query);

      if (searchRef.current) {
        searchRef.current.value = "";
      }
    }
  };

  return (
    <div className="relative w-full max-w-52">
      <Input
        ref={searchRef}
        type="text"
        placeholder="검색"
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-accent rounded-2xl"
      />
      <Search
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={16}
      />
    </div>
  );
}
