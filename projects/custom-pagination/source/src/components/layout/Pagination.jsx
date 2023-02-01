const Pagination = ({ currentPage, paginate, perPageCount, totalUsers }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / perPageCount); i++) {
    pageNumbers.push(i);
  }

  // 🚀 RENDER: ================================
  return <ul className='pagination'>
    <li>
      <button className='button' disabled={currentPage === pageNumbers[0]}  onClick={() => {
        if (currentPage !== 0) paginate(currentPage -= 1);
      }}>Prev
      </button>
    </li>

    {pageNumbers.map((number) => (
      <li key={number}>
        <button className={`button ${number === currentPage ? 'button--primary' : ''}`}
                onClick={() => paginate(number)}>{number}</button>
      </li>
    ))}

    <li>
      <button className='button' disabled={currentPage === pageNumbers.length} onClick={() => {
        if (currentPage <= pageNumbers.length - 1) paginate(currentPage += 1);
      }}>Next
      </button>
    </li>
  </ul>;
};

export default Pagination;
