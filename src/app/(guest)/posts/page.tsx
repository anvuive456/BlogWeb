const Page = async ({params, searchParams}: { params: any, searchParams: any }) => {
  const {search, page, limit} = searchParams;
  

  return (
      <>
        <form className='w-2/3 '>
          <input className='border ' name='search' defaultValue={search}/>
        </form>
      </>
  )
}


export default Page;
