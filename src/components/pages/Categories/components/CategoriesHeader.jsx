import Button from "../../../ui/Button";

export default function CategoriesHeader({ onAddCategory }) {
  return (
    <div className="flex flex-row justify-between items-center mb-4">
      <h2 className="text-lg font-bold">مدیریت دسته‌بندی‌ها</h2>

      <Button onClick={onAddCategory}>
        <span className="text-lg pl-2">+</span>
        افزودن دسته‌بندی جدید
      </Button>
    </div>
  );
}