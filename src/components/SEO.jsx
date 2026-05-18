import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path = '' }) => {
  const siteUrl = 'https://royalsoftwares.co.ke';
  const fullUrl = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{title} | Royal Software Solutions</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} | Royal Software Solutions`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Royal Software Solutions`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
    </Helmet>
  );
};

export default SEO;
