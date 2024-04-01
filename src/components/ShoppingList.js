import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSearch, setSelectedSearch] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(e) {
    setSelectedSearch(e.target.value);
  }

  function handleItemFormSubmit(e) {
    e.preventDefault();
    setItems([
      ...items,
      {
        id: e.target.name.value,
        name: e.target.name.value,
        category: e.target.category.value,
      },
    ]);
  }

  const itemsToDisplay = items
    .filter((item) => {
      if (selectedCategory === "All") return true;

      return item.category === selectedCategory;
    })
    .filter((item) => {
      if (selectedSearch === "") return true;
      return item.name.toLowerCase().includes(selectedSearch.toLowerCase());
    });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSumbit={handleItemFormSubmit} />
      <Filter
        search={selectedSearch}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
