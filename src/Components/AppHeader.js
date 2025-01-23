import { HomeFilled, MenuOutlined } from "@ant-design/icons";
import { Menu, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppCart from "./AppCart";


function AppHeader() {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };

  return (
    <div className="appheader">
      <Menu
        mode = "horizontal"
        className="nave"
        onClick={onMenuClick}
        
        items={[
          
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirts",
                key: "mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "Mens-Watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "womens-watches",
              },
              {
                label: "Women's Bags",
                key: "womens-bags",
              },
              {
                label: "Women's Jewellery",
                key: "womens-jewellery",
              },
            ],
          },

          {
            label: "Fragrances",
            key: "fragrances",
          },
        ]}
      ></Menu>
      <Typography.Title>E-Commerce Store</Typography.Title>
      <AppCart />
    </div>
  );
}


export default AppHeader;
