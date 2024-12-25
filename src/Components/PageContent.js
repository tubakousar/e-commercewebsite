import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Category from "../Pages/Category";

function PageContent() {
  return (
    <div className="pagecontent">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:categoryId" element={<Category />} />
      </Routes>
    </div>
  );
}

export default PageContent;
