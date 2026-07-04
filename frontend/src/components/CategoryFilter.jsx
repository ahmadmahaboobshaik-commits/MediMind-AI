import { useMedicines } from "../context/MedicineContext";

import "./CategoryFilter.css";

function CategoryFilter() {

  const {
    selectedCategory,
    setSelectedCategory,
  } = useMedicines();

  return (

    <div className="category-filter-container">

      <select
        className="category-select"
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value)
        }
      >

        <option>All Categories</option>

        <option>Tablet</option>

        <option>Capsule</option>

        <option>Syrup</option>

        <option>Injection</option>

        <option>Eye Drops</option>

        <option>Ointment</option>

        <option>Drops</option>

      </select>

    </div>

  );

}

export default CategoryFilter;