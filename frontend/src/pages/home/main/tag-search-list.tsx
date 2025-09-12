export default function TagSearchList({ tags }: { tags: string[] }) {
  return (
    <div>
      <div>검색 결과</div>
      <div>{tags}</div>
    </div>
  );
}
