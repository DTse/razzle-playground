import React from "react";
import { Helmet } from "react-helmet";

/**
 * Return the Meta tags Component.
 * @param {string} metaDescription
 * @param {string} metaTitle
 * @param {string} title
 * @param {string} metaImage
 * @return {component}
 **/
const Metas = ({ metaDescription, metaTitle, title, metaImage, slug }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <link rel="canonical" href={slug} />
            <meta name="description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:title" content={`${metaTitle} | Razzle Playground`} />
            <meta property="og:url" content={`http://localhost:3000/${slug}`} />
            <meta property="og:description" content={metaDescription} />
            <meta name="twitter:title" content={`${metaTitle} | Razzle Playground`} />
            <meta name="twitter:description" content={metaDescription} />
        </Helmet>
    );
};

export default Metas;