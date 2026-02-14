import React from 'react';
import { Helmet } from 'react-helmet-async';

const Support = () => {
    return (
        <>
            <Helmet>
                <title>Support - Ekthaa</title>
                <meta name="description" content="Get support for Ekthaa app. Contact us for help with your account, technical issues, or general inquiries." />
            </Helmet>

            <div className="min-h-screen bg-brand-beige py-12 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
                            Support Center
                        </h1>
                        <p className="text-gray-600 text-lg">
                            We're here to help! Find answers to common questions or reach out to our team.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                        <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                            <i className="fas fa-envelope text-brand-teal"></i>
                            Contact Us
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <i className="fas fa-envelope text-brand-teal mt-1"></i>
                                <div>
                                    <h3 className="font-semibold text-brand-dark mb-1">Email Support</h3>
                                    <a href="mailto:support@ekthaa.app" className="text-brand-teal hover:underline">
                                        support@ekthaa.app
                                    </a>
                                    <p className="text-sm text-gray-600 mt-1">
                                        We typically respond within 24-48 hours
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <i className="fas fa-phone text-brand-teal mt-1"></i>
                                <div>
                                    <h3 className="font-semibold text-brand-dark mb-1">Phone Support</h3>
                                    <a href="tel:+916305964802" className="text-brand-teal hover:underline">
                                        6305964802
                                    </a>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Mon-Fri: 9:00 AM - 6:00 PM IST
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                        <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                            <i className="fas fa-question-circle text-brand-teal"></i>
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-brand-dark mb-2">How do I create an account?</h3>
                                <p className="text-gray-600">
                                    Download the Ekthaa app from the Play Store and follow the registration process. 
                                    You'll need to provide your business details and verify your email address.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-dark mb-2">How do I list my business?</h3>
                                <p className="text-gray-600">
                                    Once registered, go to your business profile and complete all the required information 
                                    including business name, category, location, and photos. Your listing will be reviewed 
                                    and published within 24 hours.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-dark mb-2">Is there a fee to use Ekthaa?</h3>
                                <p className="text-gray-600">
                                    Basic listing is free for all businesses. We offer premium features and advertising 
                                    options for businesses looking to increase their visibility.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-dark mb-2">How do I delete my account?</h3>
                                <p className="text-gray-600">
                                    You can request account deletion from your profile settings in the app, or visit our{' '}
                                    <a href="/delete-account" className="text-brand-teal hover:underline">
                                        Delete Account page
                                    </a>
                                    {' '}for more information.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-dark mb-2">How do I report a problem?</h3>
                                <p className="text-gray-600">
                                    You can report issues directly through the app or email us at support@ekthaa.app 
                                    with details of the problem. Include screenshots if possible.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* App Store Link */}
                    <div className="bg-gradient-to-r from-brand-teal to-teal-600 rounded-xl p-8 text-white text-center">
                        <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
                        <p className="text-lg opacity-90 mb-6">
                            Download the Ekthaa Business app for direct support and more features
                        </p>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-brand-dark px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition shadow-lg"
                        >
                            <i className="fab fa-google-play text-2xl"></i>
                            <span>Get it on Play Store</span>
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 mb-4">Looking for something else?</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/privacy" className="text-brand-teal hover:underline">
                                Privacy Policy
                            </a>
                            <span className="text-gray-400">•</span>
                            <a href="/terms" className="text-brand-teal hover:underline">
                                Terms & Conditions
                            </a>
                            <span className="text-gray-400">•</span>
                            <a href="/careers" className="text-brand-teal hover:underline">
                                Careers
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Support;
