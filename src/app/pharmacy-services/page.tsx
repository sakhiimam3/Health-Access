
import PagesWrapper from '@/components/layout/pagesWrapper.tsx'
import PagesBanner from '@/components/pagesBanner'
import React from 'react' 

const page = () => {
  return (
    <PagesWrapper>
      <div className='mt-56'> 
      <PagesBanner title="Pharmacy Services"  image='/images/aesthetic-services.png' height='h-40' overlayColor='orange' textColor='white' />
      </div>
    </PagesWrapper>
  )
}

export default page
