const PaginationButtons = ({currPage}: { currPage: number }) => {
  return (
      <>
        <input type='button' name='page' className='rounded bg-white hover:bg-amber-50 transition-all duration-100'
               value={currPage - 1}>
          Trang trước
        </input>
        <input type='button' name='page' className='rounded bg-white hover:bg-amber-50 transition-all duration-100'
               value={currPage + 1}>
          Trang sau
        </input>
      </>
  )
}

export default PaginationButtons;
