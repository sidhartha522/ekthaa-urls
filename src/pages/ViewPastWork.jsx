import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

const ViewPastWork = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans text-brand-text">
            <Helmet>
                <title>View Past Work - Ekthaa</title>
                <meta name="description" content="View our past collaborations and college fest events." />
            </Helmet>

            {/* Header */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-brand-dark">
                        EKTHAA
                    </Link>
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-sm font-medium text-gray-600 hover:text-brand-teal transition-colors"
                    >
                        ← Back
                    </button>
                </div>
            </nav>

            {/* Page Header */}
            <section className="bg-gradient-to-br from-teal-50 via-white to-orange-50 py-12 md:py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-dark leading-tight mb-4">
                        View <span className="text-brand-teal">Past Work</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our previous collaborations and college fest events
                    </p>
                </div>
            </section>

            {/* Content Section - Video Grid */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Video 1 */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <iframe
                                className="w-full aspect-[9/16]"
                                src="https://www.youtube.com/embed/qdKqC0zg2WM"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video 2 */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <iframe
                                className="w-full aspect-[9/16]"
                                src="https://www.youtube.com/embed/2AAFsj01NRM"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video 3 */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <iframe
                                className="w-full aspect-[9/16]"
                                src="https://www.youtube.com/embed/SPhuq4uGp4c"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video 4 */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <iframe
                                className="w-full aspect-[9/16]"
                                src="https://www.youtube.com/embed/-wMogNg6vF8"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video 5 */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <iframe
                                className="w-full aspect-[9/16]"
                                src="https://www.youtube.com/embed/k2p8TNOULjk"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video 6 */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <iframe
                                className="w-full aspect-[9/16]"
                                src="https://www.youtube.com/embed/5d8UMqxAchE"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video 7 */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <iframe
                                className="w-full aspect-[9/16]"
                                src="https://www.youtube.com/embed/8Z_Q-HCHPU0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video 8 */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <iframe
                                className="w-full aspect-[9/16]"
                                src="https://www.youtube.com/embed/iCupiYoV1o0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video 9 */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <iframe
                                className="w-full aspect-[9/16]"
                                src="https://www.youtube.com/embed/nKLRV6-w9js"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video 10 */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <iframe
                                className="w-full aspect-[9/16]"
                                src="https://www.youtube.com/embed/kCiDIA-ur8k"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-brand-dark text-gray-400 py-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-white font-serif font-bold text-lg mb-1">EKTHAA</p>
                    <p className="text-sm">Building better discovery for local businesses.</p>
                    <p className="text-sm text-gray-500 mt-4">© {new Date().getFullYear()} Ekthaa. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ViewPastWork;
