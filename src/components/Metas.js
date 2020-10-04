import React from "react";
import { Helmet } from "react-helmet";

const Metas = ({ metaDescription, metaTitle, title, metaImage }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <link rel="canonical" href="/" />
            <title>{title}</title>
            <meta name="description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:title" content={`${metaTitle} | Razzle Playground`} />
            <meta property="og:url" content="https://www.star.gr/" />
            <meta property="og:description" content={metaDescription} />
            <meta name="twitter:title" content={`${metaTitle} | Razzle Playground`} />
            <meta name="twitter:description" content={metaDescription} />
        </Helmet>
    );
};

export default Metas;