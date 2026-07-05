import Button from "../../../ui/Button";

export default function AddCategoryModal({
  isOpen,
  onClose,
  title,
  setTitle,
  parentId,
  setParentId,
  categories,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-md w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-3">افزودن دسته‌بندی</h3>

        <label className="block mb-1">نام دسته‌بندی</label>

        <input
          className="border p-2 w-full mb-2"
          placeholder="نام دسته‌بندی"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block mb-1">دسته‌بندی اصلی</label>

        <select
          className="border p-2 w-full mb-3"
          value={parentId}
          onChange={(e) => setParentId(Number(e.target.value))}
        >
          <option value={0}>هیچکدام</option>

          {categories
            .filter((cat) => cat.parentId === null)
            .map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
        </select>

        <Button onClick={onSubmit}>اضافه کردن</Button>

        <button className="mr-2 px-3 py-2 cursor-pointer" onClick={onClose}>
          بستن
        </button>
      </div>
    </div>
  );
}
