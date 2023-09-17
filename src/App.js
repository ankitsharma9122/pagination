import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
      setTotal(data.products.length);
      console.log(data);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const paginationFunc = (idx) => {
    setPage(idx + 1);
  };

  console.log("ankit", products?.length, page);
  return (
    <div className="App">
      {total &&
        products?.slice(page * 10 - 10, page * 10).map((data, idx) => {
          return (
            <div className="box__img" key={idx}>
              <img className="img_class" src={data.thumbnail} />
              <div>{data.title}</div>
            </div>
          );
        })}
      <div>
        <span
          className="pagination__span"
          onClick={() => {
            setPage((pre) => pre - 1);
          }}
        >
          pre
        </span>
        {total &&
          [...Array(products.length / 10)].map((_, idx) => {
            return (
              <span
                className="pagination__span"
                onClick={() => paginationFunc(idx)}
              >
                {idx + 1}
              </span>
            );
          })}
        <span
          className="pagination__span"
          onClick={() => {
            setPage((pre) => pre + 1);
          }}
        >
          next
        </span>
      </div>
    </div>
  );
}
