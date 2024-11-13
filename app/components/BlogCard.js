//blogCard.js

import React from 'react';
import blogData from '../../data/blogData.json'; // Adjust the path if needed

const BlogCard = () => {
  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {blogData.map((blog, index) => (
        <div
          key={index}
          className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          <div className="relative group">
            <img
              className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-105"
              src={blog.image}
              alt={blog.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 text-pink-500">
              <h2 className="text-lg font-semibold leading-tight">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-200">
                By {blog.author} • {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 text-sm text-justify mb-4">
              {blog.description}
            </p>
            <button className="relative  text-[12px] transform shadow-sm bg-gray-800 text-white p-3 rounded-sm opacity-75 hover:opacity-100 transition-opacity">
              voir l'article
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
