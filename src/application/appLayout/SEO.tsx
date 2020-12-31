import React from "react"
import { Helmet } from "react-helmet";

interface IProps{
    description?: string;
    keywords?: string[];
    url?: string;
    image?: string;
    title?: string;
    lang?: string;
}

function SEO({ description, lang, title, keywords}: IProps) {

    const metaKeywords = keywords ? keywords : ["site", "portfolio", "full-stack developer", "developer", "developer", "software engineer", "website"]

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`Taskr - %s`}
            meta={[
                {
                    name: `description`,
                    content: description 
                },
                {
                    property: `og:title`,
                    content: title
                },
                {
                    property: `og:description`,
                    content: description
                },
                {
                    property: `og:type`,
                    content: `website`
                },
                {
                    name: `twitter:card`,
                    content: `summary`
                },
                {
                    name: `twitter:creator`,
                    content: "Hundeyin Oluwadamilola"
                },
                {
                    name: `twitter:title`,
                    content: title
                },
                {
                    name: `twitter:description`,
                    content: description
                },
            ].concat(metaKeywords && metaKeywords.length > 0 ? {
                name: `keywords`,
                content: metaKeywords.join(",")
            } : [])}
        />
    )
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
}



export default SEO
