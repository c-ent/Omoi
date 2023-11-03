import Feed from '@components/Feed';
import { Suspense } from 'react';
import NoteSkeleton from './NoteSkeleton';



const Home = () => {
  
  return (
    <section className="w-full flex-col">
      <h1 className="head_text text-left">
        Notes
        <br className="max-md:hidden"/>
      </h1>

 
      <Suspense fallback={<NoteSkeleton />}>
        <Feed />
      </Suspense>
    </section>
  )
}

export default Home