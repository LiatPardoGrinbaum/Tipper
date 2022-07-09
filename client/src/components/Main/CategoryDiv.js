import { NavLink } from "react-router-dom";

export const CategoryDiv = ({ category }) => {
  return (
    <NavLink
      to={{
        pathname: `/posts/category/${category.name.toLowerCase()}`,
        state: {
          name: category.name.toLowerCase(),
        },
      }}>
      {/*  <NavLink to={`/posts/category/${category.name.toLowerCase()}`} exact={true} state={{ hii: "hello" }}> */}
      <div className="categoryBox">
        <div className="catgoryImage">
          <img src={category.image} alt={category.name} />
        </div>
        <div className="categoryName">
          <div>
            <p>{category.name}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
