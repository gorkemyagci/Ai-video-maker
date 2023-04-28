import React, { useState } from 'react'
import Header from '@/components/CreateAiVideo/Header'
import VideoInformation from '@/components/CreateAiVideo/VideoInformation'
import VideoTemplate from '@/components/CreateAiVideo/VideoTemplate'
import Form from '@/components/CreateAiVideo/Form'

const CreateFreeVideo = () => {
    const [template, setTemplate] = useState('Compliment');
    const [form,setForm] = useState(false);
    const [templates, setTemplates] = useState([
        {
            name: 'Alwise Demo',
            image: 'https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/63f8e80c7c197262721f991f_sharing_demo_natalie.jpg'
        },
        {
            name: "Compliment",
            image: 'https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/625831721f25d962212f3de0_compliment_demo.jpg'
        }
    ]);
    return (
        <div>
            <Header />
            <div className='max-w-7xl pt-20 gap-x-10 ml-auto flex items-start justify-between'>
                {form ? <Form setForm={setForm}/> : <VideoInformation setForm={setForm} template={template} templates={templates} setTemplate={setTemplate}/>}
                <VideoTemplate template={template} templates={templates} setTemplate={setTemplate}/>
            </div>
        </div>
    )
}

export default CreateFreeVideo