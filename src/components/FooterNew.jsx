import React from 'react';
import { Link } from 'react-router-dom';

const FooterNew = () => (
    <footer className="bg-white border-t border-brand-beige mt-12">
        <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm text-brand-text">
                <div className="col-span-2 lg:col-span-1">
                    <Link to="/" className="inline-block">
                        <img src="/logo.png" alt="Ekthaa Logo" className="h-16 w-16 mb-4" />
                    </Link>
                    <p className="text-gray-500 mb-6 leading-relaxed">
                        Ekthaa - Connecting Businesses and Customers
                    </p>
                </div>
                <div>
                    <h4 className="font-serif font-bold text-brand-dark mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link to="/support" className="hover:text-brand-teal">Support</Link></li>
                        <li><Link to="/careers" className="hover:text-brand-teal">Internships & Careers</Link></li>
                        <li><Link to="/privacy" className="hover:text-brand-teal">Privacy Policy (Business)</Link></li>
                        <li><Link to="/privacy-customer" className="hover:text-brand-teal">Privacy Policy (Customer)</Link></li>
                        <li><Link to="/terms" className="hover:text-brand-teal">Terms & Conditions</Link></li>
                        <li><Link to="/delete-account" className="hover:text-brand-teal">Delete Account</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-serif font-bold text-brand-dark mb-4">Discover</h4>
                    <ul className="space-y-2">
                        <li><Link to="/explore" className="hover:text-brand-teal">Ekthaa Mart</Link></li>
                        <li><a href="#" className="hover:text-brand-teal">Local Services</a></li>
                        <li><a href="#" className="hover:text-brand-teal">Business Directory</a></li>
                        <li><a href="#" className="hover:text-brand-teal">Credit Book</a></li>
                    </ul>
                </div>
                {/* Optionally keep Legal section for redundancy or remove if not needed */}
                <div className="col-span-2 md:col-span-1">
                    <h4 className="font-serif font-bold text-brand-dark mb-4">Connect</h4>
                    <div className="flex gap-4 text-xl mb-4">
                        <a href="https://www.instagram.com/ekthaa.ai?utm_source=qr&igsh=MW1iNGU2ZG1lYWR6dg==" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:scale-110 transition">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/ekthaa/" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:scale-110 transition">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </div>
                    <p className="text-xs text-brand-text">Download the Ekthaa App for the best experience.</p>
                    <div className="flex gap-2 mt-3">
                        <a href="#" className="bg-black text-white text-xs px-3 py-2 rounded flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition">
                            <i className="fa-brands fa-apple text-lg"></i>
                            <div>
                                <div className="text-[10px] opacity-70">Download on</div>
                                <div className="font-medium">App Store</div>
                            </div>
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.ekthaa.business" target="_blank" rel="noopener noreferrer" className="bg-black text-white text-xs px-3 py-2 rounded flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition">
                            <i className="fa-brands fa-google-play text-lg"></i>
                            <div>
                                <div className="text-[10px] opacity-70">Get it on</div>
                                <div className="font-medium">Play Store</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-brand-beige mt-8 pt-8 text-center text-xs text-brand-text">
                Copyright © 2026 Ekthaa Ltd. All Rights Reserved.
            </div>
        </div>
    </footer>
);

export default FooterNew;
