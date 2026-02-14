import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const EkthaaBusiness = () => {
    return (
        <div className="min-h-screen bg-brand-beige px-4 py-12">
            <Helmet>
                <title>Ekthaa Business - Complete Guide</title>
                <meta name="description" content="Learn everything about Ekthaa Business app for local businesses" />
            </Helmet>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <img src="/logo.png" alt="Ekthaa Logo" className="h-24 w-24 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Ekthaa Business</h1>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Ekthaa Business helps customers near you discover your store. When customers search for a product on Ekthaa AI or Google, your business can show up. You get a shareable business page with your location, products, offers, and social links. It also works as an all-in-one business app to manage credits, invoices, offers, products, and stock.
                    </p>
                </div>

                {/* Features */}
                <div className="space-y-8">
                    {/* Feature 1 */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">1. Get discovered by nearby customers (for service businesses too)</h2>
                        <p className="text-gray-700 mb-4">Many service-based businesses struggle to get discovered nearby.</p>
                        <div className="bg-brand-beige p-4 rounded-lg mb-4">
                            <p className="font-semibold text-brand-dark mb-2">Example:</p>
                            <p className="text-gray-700">Maybe you own a catering service, interior design business, event decoration, or any other service. It's hard for nearby customers to find you.</p>
                        </div>
                        <p className="text-gray-700 mb-3 font-semibold">Google Maps doesn't always show:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li>Your prices</li>
                            <li>Your services clearly</li>
                            <li>How to contact you easily</li>
                        </ul>
                        <p className="text-gray-700 mb-3 font-semibold">With Ekthaa, people near you can:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Discover your business</li>
                            <li>See what services you offer</li>
                            <li>Check prices (if you add them)</li>
                            <li>View your location and contact you directly</li>
                        </ul>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">2. Product-focused discovery (exact product matters)</h2>
                        <p className="text-gray-700 mb-4">People don't always search for shops — they search for specific products.</p>
                        <div className="bg-brand-beige p-4 rounded-lg mb-4">
                            <p className="font-semibold text-brand-dark mb-2">Example:</p>
                            <p className="text-gray-700">Maybe you sell an imported table, sofa, or a specific furniture design.</p>
                        </div>
                        <p className="text-gray-700 mb-3">When customers search using Google Lens, it often shows:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li>A business in another state</li>
                            <li>Or even another country</li>
                        </ul>
                        <p className="text-gray-700 mb-2">But if you list your product on Ekthaa Business, your business details are shown to them, because you sell that exact product nearby.</p>
                        <p className="text-brand-teal font-semibold">This helps customers buy locally instead of far away.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">3. Accept orders directly from customers</h2>
                        <p className="text-gray-700 mb-4">Many customers overpay just because they don't know local prices.</p>
                        <div className="bg-brand-beige p-4 rounded-lg mb-4">
                            <p className="font-semibold text-brand-dark mb-2">Example:</p>
                            <p className="text-gray-700">You sell millets for ₹60/kg in your kirana shop. Customers search online or on quick-commerce apps and end up paying much more.</p>
                        </div>
                        <p className="text-gray-700 mb-3 font-semibold">With Ekthaa AI:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li>Customers search for the product</li>
                            <li>They see your shop</li>
                            <li>They can place an order directly</li>
                        </ul>
                        <p className="text-gray-700 mb-3">You receive a WhatsApp message with what they want. You can:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li>Deliver it yourself</li>
                            <li>Or ask them to pick it up</li>
                        </ul>
                        <p className="text-gray-700 mb-3">You can also:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-2">
                            <li>Set minimum order value</li>
                            <li>Set delivery distance</li>
                            <li>Talk to the customer directly</li>
                        </ul>
                        <p className="text-brand-teal font-semibold">No middleman.</p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">4. Shareable business page (mini website)</h2>
                        <p className="text-gray-700 mb-4">Ekthaa gives you a single business page link.</p>
                        <p className="text-gray-700 mb-3 font-semibold">This page includes:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li>Your business name</li>
                            <li>Location</li>
                            <li>Products or services</li>
                            <li>Offers</li>
                            <li>Contact details</li>
                            <li>Social media links</li>
                        </ul>
                        <p className="text-gray-700 mb-3 font-semibold">You can share this link on:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-2">
                            <li>WhatsApp</li>
                            <li>Instagram bio</li>
                            <li>Google Business</li>
                            <li>Anywhere online</li>
                        </ul>
                        <p className="text-brand-teal font-semibold">It works like your mini website, without building one.</p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">5. Manage customer credits (with customer access)</h2>
                        <p className="text-gray-700 mb-4">Credits often get confusing.</p>
                        <div className="bg-brand-beige p-4 rounded-lg mb-4">
                            <p className="font-semibold text-brand-dark mb-2">Example:</p>
                            <p className="text-gray-700">Recurring bills, monthly customers, or even rents are:</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
                                <li>Written in notebooks</li>
                                <li>Forgotten</li>
                                <li>Miscalculated</li>
                            </ul>
                        </div>
                        <p className="text-gray-700 mb-4">With Ekthaa Business, you can add credits digitally.</p>
                        <p className="text-brand-teal font-semibold mb-3">Best part:</p>
                        <p className="text-gray-700 mb-3">In the Ekthaa AI app, customers can also access their credit account.</p>
                        <p className="text-gray-700 mb-3">If you trust a customer and you're busy:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li>You can give them access</li>
                            <li>They can add credits themselves</li>
                            <li>Upload bill photos</li>
                        </ul>
                        <p className="text-gray-700 mb-3">The credit screen works like a chat, similar to PhonePe or WhatsApp:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-2">
                            <li>You both see the balance</li>
                            <li>Previous entries</li>
                            <li>You can send reminders easily</li>
                        </ul>
                        <p className="text-brand-teal font-semibold">No confusion, no arguments.</p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">6. Create invoices easily</h2>
                        <p className="text-gray-700 mb-4">You can generate invoices directly from the app.</p>
                        <div className="bg-brand-beige p-4 rounded-lg mb-2">
                            <p className="font-semibold text-brand-dark mb-2">Example:</p>
                            <p className="text-gray-700">Customer buys multiple items → you create an invoice → share it instantly on WhatsApp.</p>
                        </div>
                        <p className="text-brand-teal font-semibold">This looks professional and helps maintain records.</p>
                    </div>

                    {/* Feature 7 */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">7. Run offers and clearance sales (reach the right people)</h2>
                        <p className="text-gray-700 mb-4">You might already be running offers.</p>
                        <div className="bg-brand-beige p-4 rounded-lg mb-4">
                            <p className="font-semibold text-brand-dark mb-2">Example:</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Clearance sale on clothes</li>
                                <li>Discount on furniture</li>
                                <li>Seasonal offers</li>
                            </ul>
                        </div>
                        <p className="text-gray-700 mb-3">You might spend lakhs on marketing, but:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li>Does it reach nearby customers?</li>
                            <li>Does it reach people searching right now?</li>
                        </ul>
                        <p className="text-gray-700 mb-4">If someone searches "clearance sale near me" on Google, your business may not show up.</p>
                        <p className="text-gray-700 mb-3 font-semibold">In Ekthaa AI:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-2">
                            <li>There is a dedicated Offers section</li>
                            <li>Customers nearby can see offers around them</li>
                            <li>Customers can even ask Ekthaa AI and get your offer details</li>
                        </ul>
                        <p className="text-brand-teal font-semibold">Your offer reaches people who are actually looking to buy.</p>
                    </div>

                    {/* Feature 8 */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">8. Manage inventory easily</h2>
                        <p className="text-gray-700 mb-4">You can track what products you have.</p>
                        <div className="bg-brand-beige p-4 rounded-lg mb-4">
                            <p className="font-semibold text-brand-dark mb-2">Example:</p>
                            <p className="text-gray-700">If stock is running low, you'll know in advance.</p>
                        </div>
                        <p className="text-gray-700 mb-3">This helps you:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Avoid out-of-stock issues</li>
                            <li>Plan purchases better</li>
                            <li>Manage your shop smoothly</li>
                        </ul>
                    </div>

                    {/* Feature 9 */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">9. Add social media (videos build trust)</h2>
                        <p className="text-gray-700 mb-3">You can add:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li>Instagram reels</li>
                            <li>Shorts</li>
                            <li>YouTube videos</li>
                        </ul>
                        <p className="text-gray-700 mb-3">When customers open your business profile:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-2">
                            <li>They can watch your videos</li>
                            <li>See your products in action</li>
                            <li>Trust your business more</li>
                        </ul>
                        <p className="text-brand-teal font-semibold">This business profile can be shared as your mini website.</p>
                    </div>

                    {/* Conclusion */}
                    <div className="bg-gradient-to-r from-brand-teal to-teal-600 rounded-xl p-6 shadow-md text-white">
                        <h2 className="text-2xl font-bold mb-4">10. Conclusion</h2>
                        <p className="mb-4">Ekthaa Business is built for local businesses.</p>
                        <p className="mb-3 font-semibold">It helps you:</p>
                        <ul className="list-disc list-inside space-y-2 mb-4">
                            <li>Get discovered</li>
                            <li>Show your products or services</li>
                            <li>Accept orders</li>
                            <li>Manage credits</li>
                            <li>Run offers</li>
                            <li>Track inventory</li>
                            <li>And grow — all from one app</li>
                        </ul>
                        <p className="font-bold text-xl">No technical knowledge needed.</p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row gap-4 mt-12 justify-center">
                    <a
                        href="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-dark text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-gray-800 transition shadow-lg"
                    >
                        <i className="fab fa-google-play mr-2"></i>Download on Play Store
                    </a>
                    <Link
                        to="/"
                        className="bg-brand-teal text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-teal-600 transition shadow-lg"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EkthaaBusiness;
