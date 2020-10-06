import React from "react";
import Metas from "../components/Metas";
/**
 * Return the Home Component
 * @param {object} data
 * @return {component}
 **/
const Home = ({ data }) => {
    return (
        <>
            <Metas
                metaDescription={data && data.meta_description}
                metaTitle={data && data.meta_title}
                title={data && data.title}
                metaImage={data && data.meta_image}
                slug={data && data.slug}
            />
            <div dangerouslySetInnerHTML={{ __html: data && data.content }} />
        </>
    );
};

export default Home;
