import { Helmet } from 'react-helmet-async'

const SEO = ({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage = '/og-image.jpg',
    ogType = 'website',
    structuredData = null
}) => {
    const siteUrl = 'https://royalsoftwaresolutions.com'
    const fullTitle = title
        ? `${title} | Royal Software Solutions`
        : 'Royal Software Solutions | Enterprise Software & ERP Systems for Africa'

    const defaultDescription = 'Leading African technology company providing custom software development, Academic ERP systems, FAHARI SaaS platform, and IT consulting services for schools, universities, and businesses across Africa.'

    const defaultKeywords = 'software development Africa, ERP systems Kenya, school management system, university ERP, FAHARI SaaS,Fahari Salesforce, Point of Sale softwares, Consultation, custom software development, Fahari Zenith, Business Intelligence, CBE /CBC Education Systems, IT consulting Africa'

    const metaDescription = description || defaultDescription
    const metaKeywords = keywords || defaultKeywords
    const canonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl
    const imageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={imageUrl} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonical} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={imageUrl} />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    )
}

export default SEO
