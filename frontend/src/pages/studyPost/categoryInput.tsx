import { useState } from "react";

function CategoryInput({ onChange }: { onChange: (main: string, subs: string[]) => void }) {
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!subCategories.includes(inputValue.trim())) {
        const updated = [...subCategories, inputValue.trim()];
        setSubCategories(updated);
        onChange(mainCategory, updated);
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
    <div>
      <label>메인 카테고리</label>
      <select value={mainCategory} onChange={handleMainChange}>
        <option value="">-- 선택 --</option>
        <option value="Java">Java</option>
        <option value="Spring">Spring</option>
        <option value="React">React</option>
        <option value="Database">Database</option>
      </select>

      <input
        type="text"
        placeholder="서브 카테고리 입력 후 Enter"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div>
        {subCategories.map(sub => (
          <span
            key={sub}
            onClick={() => removeSubCategory(sub)}
            style={{
              background: "#e2e8f0",
              padding: "4px 8px",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            #{sub} ✕
          </span>
        ))}
      </div>
    </div>
  );
}

export default CategoryInput;
