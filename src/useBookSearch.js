import { useEffect, useState } from "react";

// this is done to replicate the pagination

const mimicPagination = async (pageNumber) => {
  const itemsPerPage = 200;
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let data = await fetch("https://jsonplaceholder.typicode.com/photos");
  data = await data.json();
  const paginatedData = data.slice(startIndex, endIndex);
  return { data: paginatedData, hasMore: pageNumber >= 5 ? false : true };
};

export default function useBookSearch(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    console.log("FETHCING NEW DATA WITH PAGE NUMBER ", pageNumber);
    setLoading(true);
    setError(false);

    mimicPagination(pageNumber).then((res) => {
      setData((prevBooks) => {
        return [...new Set([...prevBooks, ...res.data.map((b) => b.title)])];
      });
      setLoading(false);
      setHasMore(res.hasMore);
    });
  }, [pageNumber]);

  return { loading, error, data, hasMore };
}
