import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRef, useState } from "react";

export interface listDataType {
  userId: string;
  id: number;
  title: string;
  category: string;
  content: string;
  createdAt: string;
  deadline: string;
}

interface SearchStudyProps {
  list: listDataType[];
  onSearch: (result: listDataType[]) => void;
}

export default function SearchStudy({ list, onSearch }: SearchStudyProps) {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const searchLogic = () => {
    const searchedResultList = list.filter(study =>
      study.title.toLowerCase().includes(query.trim().toLowerCase())
    );
    onSearch(searchedResultList);
  };

  // 엔터 키 입력 후 검색창 초기화
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (query === "") {
        alert("검색어를 입력해주세요");
        return;
      }

      if (searchRef.current) {
        searchRef.current.value = "";
      }

      searchLogic();
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
