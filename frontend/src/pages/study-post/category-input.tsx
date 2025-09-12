import { useState } from "react";

function CategoryInput({ onChange }: { onChange: (main: string, subs: string[]) => void }) {
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();

      if (subCategories.length >= 3) {
        setError("최대 3개까지 입력 가능합니다.");
        return;
      }

      if (!subCategories.includes(inputValue.trim())) {
        const updated = [...subCategories, inputValue.trim()];
        setSubCategories(updated);
        onChange(mainCategory, updated);
        setError("");
      }
      setInputValue("");
    }
  };

  const handleMainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMainCategory(e.target.value);
    onChange(e.target.value, subCategories);
  };

  const removeSubCategory = (item: string) => {
    const updated = subCategories.filter(sub => sub !== item);
    setSubCategories(updated);
    onChange(mainCategory, updated);
  };

  return (
    <div className="mb-5">
      <label className="inline-block w-20 font-medium">메인 카테고리</label>
      <select
        value={mainCategory}
        onChange={handleMainChange}
        className="w-[calc(100%-5rem)] px-3 py-2 border rounded-md bg-white text-gray-700"
      >
        <option value="">-- 선택 --</option>
        <option value="lang-cert">어학/자격증</option>
        <option value="it-dev">IT/개발</option>
        <option value="career">취업</option>
        <option value="etc">기타</option>
      </select>

      <div className="mt-4">
        <label className="inline-block w-24 font-medium">서브 카테고리</label>
        <input
          type="text"
          placeholder="서브 카테고리 입력 후 Enter"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={20}
          className="px-3 py-2 border rounded-md min-w-[200px]"
        />
        {error && <span className="text-red-500 text-sm ml-3">{error}</span>}
      </div>

      <div className="ml-24 mt-2 flex gap-2 flex-wrap">
        {subCategories.map(sub => (
          <span
            key={sub}
            onClick={() => removeSubCategory(sub)}
            className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer text-sm"
          >
            #{sub} ✕
          </span>
        ))}
      </div>
    </div>
  );
}

export default CategoryInput;
