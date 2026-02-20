import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DownloadButton = ({ href, iconClass, storeName, appName, isComingSoon }) => {
    if (isComingSoon) {
        return (
            <div className="relative group overflow-hidden rounded-xl md:rounded-2xl p-[2px] bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 opacity-60 cursor-not-allowed w-full flex-1 max-w-[280px]">
                <div className="bg-white/80 backdrop-blur-md rounded-[10px] md:rounded-[14px] px-3 py-2 md:px-5 md:py-3 flex items-center gap-2 md:gap-3 w-full h-full">
                    <i className={`${iconClass} text-xl md:text-2xl text-gray-500 shrink-0`}></i>
                    <div className="text-left flex-1 min-w-0">
                        <div className="text-[8px] md:text-[10px] uppercase font-bold tracking-wider text-gray-400">Coming Soon</div>
                        <div className="font-serif font-bold text-xs md:text-sm text-gray-600 truncate">{storeName}</div>
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
            className="group relative overflow-hidden rounded-xl md:rounded-2xl p-[2px] w-full flex-1 max-w-[280px] bg-gradient-to-br from-brand-teal via-brand-coral to-brand-yellow hover:shadow-md transition-all duration-300 hover:-translate-y-1 block focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal via-brand-coral to-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl group-hover:bg-white/0 transition-colors duration-500 rounded-[10px] md:rounded-[14px] px-3 py-2 md:px-5 md:py-3 flex items-center gap-2 md:gap-3 w-full h-full">
                <i className={`${iconClass} text-xl md:text-2xl text-brand-teal group-hover:text-white transition-colors duration-500 shrink-0`}></i>
                <div className="text-left flex-1 min-w-0">
                    <div className="text-[8px] md:text-[10px] uppercase font-bold tracking-wider text-gray-500 group-hover:text-white/80 transition-colors duration-500">Download on</div>
                    <div className="font-serif font-bold text-xs md:text-sm text-brand-dark group-hover:text-white transition-colors duration-500 truncate">{storeName}</div>
                </div>
            </div>
        </a>
    );
};

const AppCard = ({ title, description, image, appStoreLink, playStoreLink, isPlayStoreComingSoon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-[1.2rem] md:rounded-[2rem] p-4 lg:p-8 shadow-xl border border-brand-beige relative overflow-hidden hover:border-brand-teal/30 transition-colors duration-500 flex flex-col h-full group/card flex-1 min-h-0"
    >
        {/* Subtle background decoration */}
        <div className="absolute -top-16 -right-16 w-32 h-32 md:w-48 md:h-48 bg-brand-yellow/10 rounded-full blur-3xl group-hover/card:bg-brand-coral/10 transition-colors duration-700 pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 md:w-64 md:h-64 bg-brand-teal/5 rounded-full blur-3xl group-hover/card:bg-brand-teal/10 transition-colors duration-700 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full justify-between gap-3 md:gap-4 min-h-0">
            <div className="flex flex-col min-h-0 shrink">
                <div className="flex items-center gap-2 mb-2 lg:mb-4 shrink-0">
                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-brand-teal/10 to-brand-coral/10 flex items-center justify-center border border-brand-beige shrink-0">
                        <img src="/logo.png" alt={`${title} Icon`} className="w-6 h-6 md:w-10 md:h-10 object-contain" />
                    </div>
                </div>

                <h3 className="text-xl md:text-3xl font-serif font-bold text-brand-dark mb-1 lg:mb-2 leading-tight shrink-0">{title}</h3>

                <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-snug lg:leading-relaxed overflow-y-auto pr-2 custom-scrollbar shrink min-h-[40px]">
                    {description}
                </p>
            </div>

            <div className="flex flex-col xl:flex-row gap-2 md:gap-4 mt-auto transition-all duration-500 ease-out border-t border-brand-beige/50 pt-3 md:pt-4 shrink-0">
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

            <div
                className="flex flex-col bg-brand-cream relative overflow-hidden"
                style={{ height: '100dvh' }}
            >
                {/* Floating Logo */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-50">
                    <Link to="/" className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-brand-dark hover:text-brand-teal transition-colors drop-shadow-sm">
                        ekthaa
                    </Link>
                </div>

                {/* Global Background Elements */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-teal/5 to-transparent pointer-events-none"></div>
                <div className="absolute top-10 md:top-20 right-5 md:right-10 w-48 h-48 md:w-72 md:h-72 bg-brand-yellow/20 rounded-full blur-[60px] md:blur-[80px] -z-10 pointer-events-none"></div>
                <div className="absolute bottom-20 md:bottom-40 left-5 md:left-10 w-64 h-64 md:w-96 md:h-96 bg-brand-coral/10 rounded-full blur-[70px] md:blur-[100px] -z-10 pointer-events-none"></div>

                <div className="container mx-auto px-4 py-4 md:py-8 lg:py-12 relative z-10 flex flex-col justify-center h-full min-h-0">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-4 md:mb-8 max-w-2xl mx-auto shrink-0 flex flex-col pt-12 sm:pt-16 md:pt-0"
                    >
                        <span className="text-brand-teal font-bold tracking-wider uppercase text-[10px] md:text-xs mb-1 block">Get the Apps</span>
                        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-dark mb-1 lg:mb-4 leading-tight">
                            Experience Ekthaa.
                        </h1>
                        <p className="hidden md:block text-sm lg:text-lg text-gray-600 px-4">
                            Download our specialized applications for business management and AI-powered assistance. Available on iOS and Android.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 max-w-6xl mx-auto w-full shrink min-h-[0] items-stretch">
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
