import React from 'react';
import { Link } from 'react-router-dom';

const FooterNew = () => (
    <footer className="bg-white border-t border-brand-beige mt-12">
        <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm text-brand-text">
                <div>
                    <h4 className="font-serif font-bold text-brand-dark mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link to="/about" className="hover:text-brand-teal">About Us</Link></li>
                        <li><Link to="/careers" className="hover:text-brand-teal">Careers</Link></li>
                        <li><Link to="/products" className="hover:text-brand-teal">Our Products</Link></li>
                        <li><Link to="/explore" className="hover:text-brand-teal">Explore</Link></li>
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
                <div>
                    <h4 className="font-serif font-bold text-brand-dark mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li><Link to="/privacy" className="hover:text-brand-teal">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-brand-teal">Terms of Use</Link></li>
                        <li><Link to="/delete-account" className="hover:text-brand-teal">Delete Account</Link></li>
                    </ul>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <h4 className="font-serif font-bold text-brand-dark mb-4">Connect</h4>
                    <div className="flex gap-4 text-xl mb-4">
                        <i className="fa-brands fa-facebook text-brand-teal cursor-pointer hover:scale-110 transition"></i>
                        <i className="fa-brands fa-twitter text-brand-teal cursor-pointer hover:scale-110 transition"></i>
                        <i className="fa-brands fa-instagram text-brand-teal cursor-pointer hover:scale-110 transition"></i>
                        <i className="fa-brands fa-linkedin text-brand-teal cursor-pointer hover:scale-110 transition"></i>
                    </div>
                    <p className="text-xs text-brand-text">Download the Ekthaa App for the best experience.</p>
                    <div className="flex gap-2 mt-3">
                        <div className="bg-black text-white text-xs px-3 py-2 rounded flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition">
                            <i className="fa-brands fa-apple text-lg"></i>
                            <div>
                                <div className="text-[10px] opacity-70">Download on</div>
                                <div className="font-medium">App Store</div>
                            </div>
                        </div>
                        <div className="bg-black text-white text-xs px-3 py-2 rounded flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition">
                            <i className="fa-brands fa-google-play text-lg"></i>
                            <div>
                                <div className="text-[10px] opacity-70">Get it on</div>
                                <div className="font-medium">Play Store</div>
                            </div>
                        </div>
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
