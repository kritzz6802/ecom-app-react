import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Catagary from "./Catagary";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

function MainContent() {
  const [itemData, setItemData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [categoryTitles, setCategoryTitles] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [filterItem, setFilterItem] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setItemData(response.data.products);

        const categories = new Set(
          response.data.products.map((item) => item.category)
        );
        setUniqueCategories(Array.from(categories));

        // Create an object to store titles based on categories
        const titlesByCategory = {};
        response.data.products.forEach((item) => {
          const { category, title } = item;
          titlesByCategory[category] = titlesByCategory[category] || [];
          titlesByCategory[category].push(title);
        });
        setCategoryTitles(titlesByCategory);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();


  }, []);

  useEffect(() => {
    const selectedTitles = Object.values(selectedItems).flat();
    const filteredItems = itemData.filter(item =>
      selectedTitles.includes(item.title)
    );
    filteredItems.length > 0 ?
      setFilterItem(filteredItems) :
      setFilterItem(itemData);

  }, [selectedItems, itemData]);


  const cacheItem = useMemo(() => {
    return Object.values(selectedItems).flat()
  }, [selectedItems])

  const handleSelectedItemsChange = (item) => {
    setSelectedItems({
      ...selectedItems,
      ...item
    });
    console.log("Updated Selected Items:", item);

  };

  const handleDelete = (val) => {
    for (let key in selectedItems) {
      const arr = selectedItems[key]
      const index = arr.findIndex((el) => el === val)
      if (index !== -1) {
        arr.splice(index, 1)
      }
    }

    setSelectedItems((prevItems) => ({ ...selectedItems }));
  };

  return (
    <>
      <div className="flex container mx-auto px-4 gap-x-4 justify-center w-full">
        <div className="leftSide">
          <div className="main-container category-box">
            <p className="category-label">Category</p>
            {uniqueCategories.map((category) => (
              <Catagary
                key={category}
                category={category}
                selectedItems={selectedItems}
                titles={categoryTitles[category]}
                onSelectedItemsChange={handleSelectedItemsChange}
              />
            ))}
          </div>
        </div>
        <div className="rightSide">
          <p className="category-label">Selected Items</p>
          <p className="mb-2">Apply Filters</p>
          <Stack direction="row" spacing={1}>
            {cacheItem.map((el) => (
              <Chip
                key={el}
                label={el}
                onDelete={() => handleDelete(el)}
              />
            ))}
          </Stack>
          <div className="product-container">
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {filterItem.map((item) => (
              <div key={item.id} className="product-card">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="api-image-data"
                  loading="lazy"
                />
                <div className="product-details flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Price: ${item.price}</p>
                  </div>
                  <IconButton
                    sx={{ color: "#000" }}
                    aria-label={`info about ${item.title}`}
                  >
                    <Link to={`/product/${item.id}`}>
                      <InfoIcon />
                    </Link>
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;
