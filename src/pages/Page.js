import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import Metas from "../components/Metas";

/**
 * Return the Page Component.
 * @param {any} props
 * @return {component}
 **/
const Page = memo(({ data }) => {
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
});

export default Page;
