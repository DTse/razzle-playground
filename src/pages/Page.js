import React, { useState, useEffect,memo } from "react";
import axios from "axios";
import Metas from "../components/Metas";

const Page = memo((props) => {
    const [data, setData] = useState();

    useEffect(()=>{
      axios.get('/page'+props.location.pathname).then((res)=>{
        setData( {...res.data[0]} );
      })
    },[]);

    return (
        <>
            <Metas
                metaDescription={data && data.meta_description}
                metaTitle={data && data.meta_title}
                title={data && data.title}
                metaImage={data && data.meta_image}
            />
            <div dangerouslySetInnerHTML={{__html:data && data.content}}/>
        </>
    );
});

export default Page;
