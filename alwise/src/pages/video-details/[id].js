import { db } from '@/firebase'
import HomeLayout from '@/layout/HomeLayout'
import { apiKey } from '@/utils'
import axios from 'axios'
import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const VideoDetails = () => {
  const router = useRouter()
  const [video, setVideo] = useState({})
  const [sourceUrl, setSourceUrl] = useState("")
  const [status, setStatus] = useState("")
  const { user } = useSelector(state => state.auth)
  const unSub = user && user.uid && onSnapshot(doc(db, "userVideos", user?.uid), (data) => {
    if (data.exists()) {
      setVideo(data.data().videos.filter(video => video.videoId === router.query.id)[0]);
    }
  })
  const getVideo = () => {
    axios.get(`https://api.synthesia.io/v2/videos/${router?.query?.id}`, {
      headers: {
        "Authorization": `${apiKey}`
      }
    }).then(data => {
      console.log(data.data);
      setSourceUrl(data?.data?.download);
      setStatus(data?.data?.status);
      console.log(data);
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    unSub && unSub();
    getVideo();
  }, []);
  return (
    <HomeLayout>
      <div className="video-details p-10">
        <h1 className='text-2xl font-medium tracking-wide'>{video?.title}</h1>
        {
          status === "complete" ? <div className='source-video mt-14 w-full mx-auto flex flex-col items-center'>
            <video src={sourceUrl} className='mx-auto rounded-md' controls poster={video?.result_url}>

            </video>
            <a href={sourceUrl} download className='mt-7 font-medium text-xl underline'>Download Video</a>
          </div> : <div className='source-video mt-14 w-full mx-auto flex flex-col items-center'>
            <p className='mt-7 font-medium text-2xl text-alwise animate-pulse'>Video is being generated. Please wait.</p>
            <span className='text-sm pt-1 font-semibold text-yellow-400'>May take up to 10 minutes</span>
          </div>
        }
      </div>
    </HomeLayout>
  )
}

export default VideoDetails