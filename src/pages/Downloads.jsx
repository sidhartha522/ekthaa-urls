import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const DownloadButton = ({ href, iconClass, storeName, appName, isComingSoon }) => {
    if (isComingSoon) {
        return (
            <div className="relative group overflow-hidden rounded-2xl p-[2px] bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 opacity-60 cursor-not-allowed w-full sm:w-[220px]">
                <div className="bg-white/80 backdrop-blur-md rounded-[14px] px-6 py-4 flex items-center gap-4 h-full w-full">
                    <i className={`${iconClass} text-2xl text-gray-500`}></i>
                    <div className="text-left flex-1 min-w-0">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Coming Soon</div>
                        <div className="font-serif font-bold text-gray-600 truncate">{storeName}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl p-[2px] w-full sm:w-[220px] bg-gradient-to-br from-brand-teal via-brand-coral to-brand-yellow hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 block focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal via-brand-coral to-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl group-hover:bg-white/0 transition-colors duration-500 rounded-[14px] px-6 py-4 flex items-center gap-4 h-full w-full">
                <i className={`${iconClass} text-2xl text-brand-teal group-hover:text-white transition-colors duration-500 group-hover:drop-shadow-md`}></i>
                <div className="text-left flex-1 min-w-0">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500 group-hover:text-white/80 transition-colors duration-500">Download on</div>
                    <div className="font-serif font-bold text-brand-dark group-hover:text-white transition-colors duration-500 truncate">{storeName}</div>
                </div>
                <div className="absolute inset-0 rounded-[14px] ring-1 ring-inset ring-brand-teal/20 group-hover:ring-white/50 transition-all duration-500"></div>
            </div>
        </a>
    );
};

const AppCard = ({ title, description, image, appStoreLink, playStoreLink, isPlayStoreComingSoon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-brand-beige relative overflow-hidden hover:border-brand-teal/30 transition-colors duration-500 flex flex-col h-full group/card"
    >
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-yellow/10 rounded-full blur-3xl group-hover/card:bg-brand-coral/10 transition-colors duration-700"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl group-hover/card:bg-brand-teal/10 transition-colors duration-700"></div>

        <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
                <div className="mb-8 relative inline-block">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-teal/10 to-brand-coral/10 flex items-center justify-center border border-brand-beige">
                        {/* Placeholder for app logo icon if image is not provided, using Ekthaa logo for now */}
                        <img src="/logo.png" alt={`${title} Icon`} className="w-12 h-12 object-contain" />
                    </div>
                    {/* Decorative dot */}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-brand-yellow border-4 border-white"></div>
                </div>

                <h3 className="text-3xl font-serif font-bold text-brand-dark mb-4">{title}</h3>
                <p className="text-gray-600 mb-10 leading-relaxed max-w-sm">
                    {description}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <DownloadButton
                    href={appStoreLink}
                    iconClass="fa-brands fa-apple"
                    storeName="App Store"
                    appName={title}
                />
                <DownloadButton
                    href={playStoreLink}
                    iconClass="fa-brands fa-google-play"
                    storeName="Google Play"
                    appName={title}
                    isComingSoon={isPlayStoreComingSoon}
                />
            </div>
        </div>
    </motion.div>
);

const Downloads = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Download Ekthaa Apps</title>
                <meta name="description" content="Download Ekthaa Business and Ekthaa AI applications for iOS and Android." />
            </Helmet>

            <div className="min-h-screen bg-brand-cream pt-24 pb-20 relative overflow-hidden">
                {/* Global Background Elements */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-teal/5 to-transparent"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-brand-yellow/20 rounded-full blur-[80px] -z-10"></div>
                <div className="absolute bottom-40 left-10 w-96 h-96 bg-brand-coral/10 rounded-full blur-[100px] -z-10"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 max-w-2xl mx-auto"
                    >
                        <span className="text-brand-teal font-bold tracking-wider uppercase text-sm mb-4 block">Get the Apps</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-dark mb-6 leading-tight">
                            Experience Ekthaa on your mobile device.
                        </h1>
                        <p className="text-lg text-gray-600">
                            Download our specialized applications for business management and AI-powered assistance. Available on iOS and Android.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                        <AppCard
                            title="Ekthaa Business"
                            description="Empower your business with our comprehensive suite of tools. Manage operations, connect with customers, and grow your reach seamlessly."
                            appStoreLink="https://apps.apple.com/in/app/ekthaa-business/id6758575188"
                            playStoreLink="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                            isPlayStoreComingSoon={false}
                            delay={0.2}
                        />

                        <AppCard
                            title="Ekthaa AI"
                            description="Your intelligent shopping assistant. Discover products, explore businesses, and get personalized recommendations powered by AI."
                            appStoreLink="https://apps.apple.com/in/app/ekthaa-ai/id6759034113"
                            playStoreLink="#"
                            isPlayStoreComingSoon={true}
                            delay={0.4}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Downloads;
