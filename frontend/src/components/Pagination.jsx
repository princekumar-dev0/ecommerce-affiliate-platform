import React from "react";

function Pagination({
  productsPerPage,
  totalProducts,
  currentPage,
  paginate,
}) {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalProducts / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-10 gap-3 flex-wrap">

      <button
        onClick={() =>
          currentPage > 1 && paginate(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
      >
        Previous
      </button>

      {pageNumbers.map((number) => (

        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === number
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          {number}
        </button>

      ))}

      <button
        onClick={() =>
          currentPage < pageNumbers.length &&
          paginate(currentPage + 1)
        }
        disabled={currentPage === pageNumbers.length}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;