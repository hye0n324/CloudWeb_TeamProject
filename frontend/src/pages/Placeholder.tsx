export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <h1 className="text-4xl font-bold">{title} 페이지 준비 중</h1>
    </div>
  );
}
