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
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "inline-block", width: "80px" }}>메인 카테고리</label>
      <select
        value={mainCategory}
        onChange={handleMainChange}
        style={{
          width: "calc(100% - 110px)",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      >
        <option value="">-- 선택 --</option>
        <option value="language">어학/ 자격증</option>
        <option value="progrming">IT 개발</option>
        <option value="job">취업</option>
        <option value="etc">기타</option>
      </select>

      <div style={{ marginBottom: "8px" }}>
        <label style={{ display: "inline-block", width: "100px", fontWeight: 500 }}>
          서브 카테고리
        </label>
        <input
          type="text"
          placeholder="서브 카테고리 입력 후 Enter"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            minWidth: "200px",
          }}
        />
      </div>

      <div style={{ marginLeft: "100px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
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
