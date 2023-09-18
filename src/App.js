import React, { useState, useRef, useCallback } from "react";
import useBookSearch from "./useBookSearch";

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, hasMore, loading, error } = useBookSearch(pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, pageNumber]
  );

  return (
    <>
      {data.map((book, index) => {
        if (data.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={book}>
              {book}
            </div>
          );
        } else {
          return <div key={book}>{book}</div>;
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </>
  );
}
