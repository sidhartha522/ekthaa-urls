import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for dynamic meta tags
 */
const SEO = ({
    title = 'Ekthaa - Local Business Directory',
    description = 'Discover local businesses, products, and services near you. Connect with trusted businesses and manage your credit transactions.',
    keywords = 'local business, products, services, credit book, Ekthaa, India',
    image = '/og-image.png',
    url = '',
    type = 'website'
}) => {
    const siteUrl = 'https://ekthaa.app'; // Production domain
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Canonical URL */}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}${image}`} />
            <meta property="og:site_name" content="Ekthaa" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}${image}`} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="author" content="Ekthaa" />
        </Helmet>
    );
};

export default SEO;
