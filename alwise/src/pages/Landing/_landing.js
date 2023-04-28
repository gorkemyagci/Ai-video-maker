import Header from '@/components/Header/Header'
import Alwise from '@/components/Landing/Alwise';
import Comments from '@/components/Landing/Comments';
import About from '@/components/Landing/About';
import Video from '@/components/Landing/Video';

const Landing = () => {
  return (
    <>
      <div className='w-full h-screen overflow-y-auto flex-col flex justify-start pb-20 items-center'>
        <Header />
        <Video />
        <Alwise />
        <Comments />
        <About />
      </div>
    </>
  )
}

export default Landing