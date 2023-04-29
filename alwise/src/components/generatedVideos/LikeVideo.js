import { db } from '@/firebase';
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { memo, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux';

const LikeVideo = ({ obj }) => {
    const { user } = useSelector(state => state.auth);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        let unsubscribe;
        if (user && user.uid) {
            const docRef = doc(db, "userVideos", user.uid);
            unsubscribe = onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    setVideos(data.videos || []);
                }
            });
        }
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, [user]);

    const handleClick = (element) => {
        const newVideos = videos.map(item => {
            if (item.videoId === element.videoId) {
                if (item.liked) {
                    toast.success('Video removed from liked videos');
                } else {
                    toast.success('Video added to liked videos');
                }
                return {
                    ...item,
                    liked: !item.liked
                };
            }
            return item;
        });
        updateDoc(doc(db, "userVideos", user?.uid), {
            videos: newVideos
        });
    }
    return (
        <div className='cursor-pointer'>
            {obj.liked ? <AiFillHeart size={25} className='text-red-400' onClick={() => handleClick(obj)}/> : <AiOutlineHeart size={25} onClick={() => handleClick(obj)} />}
        </div>
    )
}

export default memo(LikeVideo)
