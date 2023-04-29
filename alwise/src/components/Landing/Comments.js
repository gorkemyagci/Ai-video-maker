import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll';
import CommentsData from '@/data/Comments';
import Icon from '@/Icon';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

const Comments = () => {
    const favoritesRef = useRef();
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    useEffect(() => {
        const isEnd = favoritesRef.current.offsetWidth + favoritesRef.current.scrollLeft == favoritesRef.current.scrollWidth;
        setNext(!isEnd);
        favoritesRef.current.addEventListener('scroll', () => {
            const isEnd = favoritesRef.current.offsetWidth + favoritesRef.current.scrollLeft == favoritesRef.current.scrollWidth;
            const isBeging = favoritesRef.current.scrollLeft == 0;
            setPrev(!isBeging);
            setNext(!isEnd);
        })
    }, [favoritesRef])
    const slideFavoritesNext = () => {
        favoritesRef.current.scrollLeft += favoritesRef.current.offsetWidth - 300;
    }
    const slideFavoritesPrev = () => {
        favoritesRef.current.scrollLeft -= favoritesRef.current.offsetWidth - 300;
    }
    return (
        <div className='flex flex-col items-center gap-y-5 mt-28'>
            <h2 className='text-3xl font-semibold'>See why people like you choose <span className='text-alwise'>Alwise</span></h2>
            <div className='relative max-w-6xl'>
                {prev && <button onClick={slideFavoritesPrev} className="rounded-full absolute hover:scale-[1.06] -left-14 bg-white bg-opacity-10 z-10 top-1/2 -translate-y-1/2 w-12 h-12 flex justify-center items-center text-white"><HiOutlineArrowLeft/></button>}
                {next && <button onClick={slideFavoritesNext} className="absolute hover:scale-[1.06] -right-14 bg-white bg-opacity-10 z-10 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 flex justify-center items-center text-white"><HiOutlineArrowRight/></button>}
                <ScrollContainer innerRef={favoritesRef} className='flex scrollable overflow-x gap-x-6 mt-10'>
                    {CommentsData.map((comment, index) => {
                        return (
                            <div key={index} className='flex flex-col gap-y-3 w-80 flex-shrink-0 bg-white text-black px-5 py-5 rounded-md'>
                                <h4 className='font-semibold text-lg'>{comment.title}</h4>
                                <p className='font-normal text-[15px]'>
                                    {comment.description}
                                </p>
                                <div className='mt-5 flex items-center gap-x-3'>
                                    <Image
                                        src={comment.image}
                                        alt="Profile"
                                        width={40}
                                        height={40}
                                        className='rounded-full'
                                    />
                                    <span className='font-medium'>{comment.name}</span>
                                </div>
                            </div>
                        )
                    })}
                </ScrollContainer>
            </div>
        </div >
    )
}

export default Comments