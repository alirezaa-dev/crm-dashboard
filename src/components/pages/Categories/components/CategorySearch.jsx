export default function CategorySearch({ search, setSearch }) {
  return (
    <div className="flex flex-row gap-4 mb-4">
      <input
        className="h-12 leading-12 px-3 border border-gray-200 rounded bg-white w-full"
        type="text"
        placeholder="جستجوی دسته‌بندی"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
