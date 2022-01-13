import { useEffect, useState } from "react";
import { getCategories, getReviews } from "../utils";

const SortBy = ({ setGames, setCount, setQuery }) => {
  const [sorting, setSorting] = useState({ category: "", sort: "" });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleCategoryChange = (event) => {
    return setSorting((currentInput) => {
      currentInput.category = event.target.value;
      return { ...currentInput };
    });
  };

  const handleChange = (event) => {
    return setSorting((currentInput) => {
      currentInput.sort = event.target.value;
      return { ...currentInput };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { category, sort } = sorting;
    let queryStr = "";
    if (category.length > 0 && sort.length > 0) {
      queryStr += `category=${category}&${sort}`;
    } else if (category.length > 0) {
      queryStr += "category=" + category;
    } else if (sort.length > 0) {
      queryStr += sort;
    }
    setQuery(queryStr);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <select
          name="category"
          id="category"
          onChange={handleCategoryChange}
          value={sorting.categories}
        >
          <option value="" disabled selected>
            --Categories--
          </option>
          <option value="">All</option>
          {categories.map((category) => {
            return (
              <option key={category.slug} value={category.slug}>
                {category.slug}
              </option>
            );
          })}
        </select>

        <select
          name="popular"
          id="popular"
          placeholder="category"
          onChange={handleChange}
          value={sorting.sort}
        >
          <option value="" disabled selected>
            --Sort By--
          </option>
          <option value="">Newest</option>
          <option value="sort_by=votes&order=DESC">Most Votes</option>
          <option value="sort_by=votes">Least Votes</option>
          <option value="sort_by=comment_count&order=DESC">
            Most Comments
          </option>
          <option value="sort_by=comment_count">Least Comments</option>
          <option value="sort_by=title">A-Z by Title</option>
          <option value="sort_by=title&order=DESC">Z-A by Title</option>
          <option value="sort_by=owner">A-Z by Reviewer</option>
          <option value="sort_by=owner&order=DESC">Z-A by Reviewer</option>
        </select>
        <button type="submit">Sort</button>
      </form>
    </div>
  );
};

export default SortBy;
