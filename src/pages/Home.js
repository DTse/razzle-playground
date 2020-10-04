import React, { useState, useEffect } from "react";
import axios from "axios";
import Metas from "../components/Metas";
/**
 * Return the Home Component
 * @return {component}
 **/
const Home = () => {
    const [data, setData] = useState();

    useEffect(()=>{
      axios.get('/page/home').then((res)=>{
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
};

export default Home;
