import { db } from '@/firebase'
import HomeLayout from '@/layout/HomeLayout'
import { dIdKey } from '@/utils'
import axios from 'axios'
import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const VideoDetails = () => {
  const router = useRouter()
  const [video, setVideo] = useState({})
  const [sourceUrl, setSourceUrl] = useState("")
  const { user } = useSelector(state => state.auth)
  const unSub = user && user.uid && onSnapshot(doc(db, "userVideos", user?.uid), (data) => {
    if (data.exists()) {
      setVideo(data.data().videos.filter(video => video.videoId === router.query.id)[0]);
    }
  })
  const getVideo = () => {
    axios.get(`https://api.d-id.com/talks/${router?.query?.id}`, {
      headers: {
        "Authorization": `Basic ${dIdKey}`
      }
    }).then(data => {
      setSourceUrl(data.data.result_url)
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
        <div className='source-video mt-14 w-full mx-auto flex flex-col items-center'>
          <video src={sourceUrl} className='mx-auto rounded-md' controls poster={video?.result_url}>

          </video>
          <a href={sourceUrl} className='mt-7 font-medium text-xl underline'>Download Video</a>
        </div>
      </div>
    </HomeLayout>
  )
}

export default VideoDetails