import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {name: 'Test'},
  {name: 'My Tasks'},
  {name: 'Log in'}
]

const Navbar = () => {
    
  return (
    <div>
      {categories.slice(0, categories.length).map((category) => (
        <button className="category-button" key={category.name}>
          <Link
            to={`/${category.name.toLowerCase().replace(" ", "")}`}
            key={category.name}
          >
            {category.name}
          </Link>
        </button>
      ))}
    </div>
  );
}

export default Navbar;