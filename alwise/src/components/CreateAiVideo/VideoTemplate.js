import Image from 'next/image'
import React from 'react'

const VideoTemplate = ({template, templates}) => {
    const filteredTemplate = templates.filter((t) => t.name === template);
  return (
    <div>
        <figure>
            <Image
            src={filteredTemplate[0]?.image}
            alt={filteredTemplate[0]?.name}
            width={800}
            height={900}
            className='rounded-l-xl'
            />
        </figure>
    </div>
  )
}

export default VideoTemplate