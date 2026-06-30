import { useContext, useState } from "react";
import Button from "../../ui/Button";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import DeleteButton from "../../ui/DeleteButton";
import ActiveStatus from "../../ui/ActiveStatus";
import { BrandContext } from "../../../context/BrandContext";
import { ProductContext } from "../../../context/ProductContext";

import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";

export default function Brands() {
  const { brands, setBrands } = useContext(BrandContext);
  const { products } = useContext(ProductContext);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [selectedBrandId, setSelectedBrandId] = useState(null);

  const [nextId, setNextId] = useState(4);

  const countProducts = (brandId) =>
    products.filter((product) => product.brandId === brandId).length;

  function resetForm() {
    setTitle("");
    setIsActive(true);
  }

  function addBrand() {
    if (!title.trim()) {
      alert("لطفا نام برند را وارد کنید");
      return;
    }

    const newBrand = {
      id: nextId,
      title,
      isActive: true,
    };

    setBrands((prev) => [...prev, newBrand]);
    setNextId((prev) => prev + 1);

    resetForm();
    setIsModalOpenAdd(false);
  }

  function updateBrand() {
    if (!title.trim()) {
      alert("لطفا نام برند را وارد کنید");
      return;
    }

    setBrands((prev) =>
      prev.map((brand) =>
        brand.id === selectedBrandId
          ? {
              ...brand,
              title,
              isActive,
            }
          : brand,
      ),
    );

    resetForm();
    setSelectedBrandId(null);
    setIsModalOpenEdit(false);
  }

  function deleteBrand() {
    setBrands((prev) => prev.filter((brand) => brand.id !== selectedBrandId));

    setSelectedBrandId(null);
    setIsModalOpenDelete(false);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-bold">مدیریت برندها</h2>

        <Button onClick={() => setIsModalOpenAdd(true)}>
          <span className="text-lg pl-2">+</span>
          افزودن برند جدید
        </Button>
      </div>

      <div className="bg-white rounded-md">
        <table className="w-full text-right rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-4 border-b">شماره</th>
              <th className="px-4 py-4 border-b">نام برند</th>
              <th className="px-4 py-4 border-b">تعداد محصولات</th>
              <th className="px-4 py-4 border-b">وضعیت</th>
              <th className="px-4 py-4 border-b">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td className="px-4 py-3 border-b">{brand.id}</td>

                <td className="px-4 py-3 border-b">{brand.title}</td>

                <td className="px-4 py-3 border-b">
                  {countProducts(brand.id)}
                </td>

                <td className="px-4 py-3 border-b">
                  <ActiveStatus status={brand.isActive} />
                </td>

                <td className="px-4 py-3 border-b">
                  <button
                    className="p-2 mx-1 rounded-md bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setSelectedBrandId(brand.id);
                      setTitle(brand.title);
                      setIsActive(brand.isActive);
                      setIsModalOpenEdit(true);
                    }}
                  >
                    <MdOutlineModeEdit className="text-blue-600" />
                  </button>

                  <button
                    className="p-2 mx-1 rounded-md bg-red-100 cursor-pointer"
                    onClick={() => {
                      setSelectedBrandId(brand.id);
                      setIsModalOpenDelete(true);
                    }}
                  >
                    <MdDeleteOutline className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}

      <AddModal
        isOpen={isModalOpenAdd}
        onClose={() => setIsModalOpenAdd(false)}
        title={title}
        setTitle={setTitle}
        onAdd={addBrand}
      />

      {/* EDIT MODAL */}

      <EditModal
        isOpen={isModalOpenEdit}
        onClose={() => setIsModalOpenEdit(false)}
        title={title}
        setTitle={setTitle}
        isActive={isActive}
        setIsActive={setIsActive}
        onEdit={updateBrand}
      />

      {/* DELETE MODAL */}

      {isModalOpenDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96">
            <p className="mb-3">آیا از حذف برند مطمئن هستید؟</p>

            <DeleteButton onClick={deleteBrand}>حذف</DeleteButton>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsModalOpenDelete(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </>
  );
}
