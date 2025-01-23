import React, { useEffect } from "react";
import {
  getallproducts,
  getproductsbycategory,
  addtocart,
} from "../reduxtoolkit/Slice";

import { useDispatch, useSelector } from "react-redux";


import {
  List,
  Card,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
} from "antd";
import { useParams } from "react-router-dom";

function Products() {
  const { categoryId } = useParams();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.productlists.products);

  useEffect(() => {
    if (categoryId) {
      dispatch(getproductsbycategory(categoryId));
    } else {
      dispatch(getallproducts());
    }
  }, [dispatch, categoryId]);

  const addproducttocart = (product) => {
    dispatch(
      addtocart({
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.thumbnail,
        quantity: 1,
      })
    );

    message.success("product added successfully");
    console.log("Title:", product.thumbnail);
  };

  return (
    <div>
      <List
        grid={{ column: 3 }}
        dataSource={products} //  products ki list ko nechy show (render) kray ga
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              className="itemcardbadge"
              text={`${product.discountPercentage}% Off`}
              color="pink"
            >
              <Card
                className="itemcard"
                title={product.title}
                key={index}
                cover={
                  <Image className="imagecarditem" src={product.thumbnail} />
                }
                actions={[
                  <Rate allowHalf disabled value={product.rating} />,

                  <Button type="link" onClick={() => addproducttocart(product)}>
                    Add to Cart
                  </Button>,
                ]}
              >
                {/* <h5>price : ${product.price}</h5>     OR */}
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      price: ${product.price}{" "}
                      <Typography.Text delete type="danger">
                        {parseFloat(
                          product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
      />
    </div>
  );
}

export default Products;
