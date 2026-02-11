import React from 'react';
import { Helmet } from 'react-helmet-async';

const WHATSAPP_LINK = 'https://wa.me/916305964802?text=Hi%20Ekthaa%2C%20I%20want%20to%20include%20my%20brand%20in%20your%20college%20stalls';
const EMAIL_LINK = 'mailto:contact@ekthaa.com?subject=Brand%20Collaboration%20Inquiry';
const INSTAGRAM_LINK = 'https://instagram.com/ekthaa.app';
const CTA_LINK = 'https://wa.me/916305964802?text=Hi%20Ekthaa%2C%20I%20want%20to%20include%20my%20brand%20in%20your%20college%20stalls';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Why Ekthaa', href: '#why-ekthaa' },
    { label: 'Plans', href: '#plans' },
    { label: 'Contact', href: '#contact' },
];

const plans = [
    {
        name: 'Free Plan',
        price: 'FREE',
        color: 'border-gray-300',
        badge: 'bg-gray-100 text-gray-700',
        features: [
            'Register your business on EKTHAA',
            'Provide 10–20 free coupons or vouchers',
            'Included in Play & Win stall gifts',
            'No monetary cost',
        ],
    },
    {
        name: 'Starter Promotion',
        price: '₹1,000 – ₹3,000',
        color: 'border-brand-teal',
        badge: 'bg-teal-50 text-brand-teal',
        features: [
            'Everything in Free Plan',
            'More vouchers and product samples',
            'Wider campus reach',
        ],
    },
    {
        name: 'Brand Visibility',
        price: '₹3,000 – ₹5,000',
        color: 'border-orange-400',
        badge: 'bg-orange-50 text-orange-600',
        popular: true,
        features: [
            'Everything in Starter Plan',
            'Brand logo displayed on stall flex (bottom section)',
            'Higher number of samples and vouchers',
        ],
    },
    {
        name: 'Co-Sponsor',
        price: '₹5,000 – ₹7,000',
        color: 'border-brand-dark',
        badge: 'bg-gray-900 text-white',
        features: [
            'Everything above',
            'Bigger logo placement on stall',
            'Listed as Co-Sponsor along with EKTHAA',
            'Maximum visibility and engagement',
        ],
    },
];

const steps = [
    { num: '1', text: 'Student pays a small amount (~₹30)' },
    { num: '2', text: 'Plays a game with 3 rounds' },
    { num: '3', text: 'Earns points (up to 300)' },
];

const rewards = [
    { points: '100 pts', label: 'Brand voucher or coupon', icon: '🎟️' },
    { points: '200 pts', label: 'Product sample', icon: '🎁' },
    { points: '300 pts', label: 'High-value reward', icon: '🏆' },
];

const EventsLanding = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const handlePlanClick = (planName) => {
        let msg = '';
        if (planName === 'Free Plan') {
            msg = 'Hi Ekthaa, I want to include my brand in your college stalls\nI am interested in free plan';
        } else if (planName === 'Starter Promotion') {
            msg = 'Hi Ekthaa, I want to include my brand in your college stalls\nI am interested in the Starter Promotion plan';
        } else if (planName === 'Brand Visibility') {
            msg = 'Hi Ekthaa, I want to include my brand in your college stalls\nI am interested in the Brand Visibility plan';
        } else if (planName === 'Co-Sponsor') {
            msg = 'Hi Ekthaa, I want to include my brand in your college stalls\nI am interested in the Co-Sponsor plan';
        } else {
            msg = 'Hi Ekthaa, I want to include my brand in your college stalls';
        }
        const url = `https://wa.me/916305964802?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

    const scrollTo = (id) => {
        setMobileMenuOpen(false);
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white font-sans text-brand-text">
            <Helmet>
                <title>Ekthaa Events – Promote Your Brand at College Fests</title>
                <meta name="description" content="Put your brand in front of 1,000s of college students through Ekthaa's Play & Win stalls. Affordable promotion plans for brands of every size." />
            </Helmet>

            {/* ─── NAVBAR ─── */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-2xl font-serif font-bold tracking-tight text-brand-dark">
                        EKTHAA
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(l => (
                            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-medium text-gray-600 hover:text-brand-teal transition-colors">
                                {l.label}
                            </button>
                        ))}
                        <a href={CTA_LINK} target="_blank" rel="noopener noreferrer" className="bg-brand-teal text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-teal-600 transition-all shadow-md hover:shadow-lg">
                            Include My Brand
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button className="md:hidden flex flex-col gap-1.5" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                        <span className={`block w-6 h-0.5 bg-brand-dark transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-brand-dark transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-brand-dark transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-5 pt-3 space-y-4">
                        {navLinks.map(l => (
                            <button key={l.href} onClick={() => scrollTo(l.href)} className="block w-full text-left text-base font-medium text-gray-700 hover:text-brand-teal">
                                {l.label}
                            </button>
                        ))}
                        <a href={CTA_LINK} target="_blank" rel="noopener noreferrer" className="block text-center bg-brand-teal text-white font-semibold px-5 py-3 rounded-full hover:bg-teal-600 transition-all">
                            Include My Brand
                        </a>
                    </div>
                )}
            </nav>

            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-orange-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-brand-dark leading-tight mb-6">
                        Put Your Brand in Front of<br className="hidden sm:block" /> <span className="text-brand-teal">1,000s of College Students</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Promote your brand through Ekthaa's <strong>Play &amp; Win</strong> college stalls and AI-powered local discovery platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={CTA_LINK} target="_blank" rel="noopener noreferrer" className="bg-brand-teal text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl">
                            Include My Brand
                        </a>
                        <button onClick={() => scrollTo('#plans')} className="border-2 border-brand-teal text-brand-teal font-semibold px-8 py-4 rounded-full text-lg hover:bg-teal-50 transition-all">
                            View Plans
                        </button>
                    </div>
                </div>
                {/* decorative blobs */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-teal-100 rounded-full opacity-30 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-100 rounded-full opacity-30 blur-3xl" />
            </section>

            {/* ─── ABOUT / WHAT IS EKTHAA ─── */}
            <section id="about" className="py-20 md:py-28 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark text-center mb-6">What is Ekthaa?</h2>
                    <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
                        Ekthaa is an <strong>AI-powered discovery app</strong> that helps local businesses get discovered by nearby customers, while connecting businesses and customers on one platform.
                    </p>

                    <div className="bg-brand-cream rounded-2xl p-8 md:p-10 mb-10">
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Currently, Ekthaa is setting up <strong>college fest stalls</strong> in collaboration with students across different campuses. Through these stalls, brands can:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { icon: '📦', text: 'Promote their products alongside Ekthaa' },
                                { icon: '🎟️', text: 'Distribute samples, vouchers, or coupons' },
                                { icon: '👀', text: 'Get direct visibility among students & visitors' },
                                { icon: '🧠', text: 'Build strong brand recall among young audiences' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="text-gray-700">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-center text-gray-600 text-lg">
                        Ekthaa offers multiple <strong>promotion plans</strong> based on your budget and the level of visibility you're looking for.
                    </p>
                </div>
            </section>

            {/* ─── WHY COLLABORATE ─── */}
            <section id="why-ekthaa" className="py-20 md:py-28 bg-brand-cream">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark text-center mb-14">Why Collaborate with Ekthaa?</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Problem */}
                        <div className="bg-white rounded-2xl p-8 border-l-4 border-red-400 shadow-sm">
                            <h3 className="text-xl font-bold text-red-500 mb-5">❌ Problem with Normal College Stalls</h3>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 text-lg">•</span>
                                    <span>Colleges charge <strong>₹30,000 – ₹1,00,000</strong> for brand stalls</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 text-lg">•</span>
                                    <span>Students ignore most stalls because they feel like <strong>pure promotion</strong></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 text-lg">•</span>
                                    <span>Low engagement, low recall, <strong>poor ROI</strong></span>
                                </li>
                            </ul>
                        </div>

                        {/* Solution */}
                        <div className="bg-white rounded-2xl p-8 border-l-4 border-brand-teal shadow-sm">
                            <h3 className="text-xl font-bold text-brand-teal mb-5">✅ Ekthaa's Solution</h3>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="text-brand-teal mt-1 text-lg">•</span>
                                    <span>Stalls are registered as <strong>"Play &amp; Win"</strong> stalls by students</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-brand-teal mt-1 text-lg">•</span>
                                    <span><strong>Natural crowd attraction</strong> — students come on their own</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-brand-teal mt-1 text-lg">•</span>
                                    <span><strong>Real interaction</strong> instead of forced promotion</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── HOW PLAY & WIN WORKS ─── */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark text-center mb-14">How Play &amp; Win Works</h2>

                    {/* Steps */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
                        {steps.map((s, i) => (
                            <React.Fragment key={i}>
                                <div className="flex items-center gap-4 bg-brand-cream rounded-2xl px-6 py-5 w-full md:w-auto">
                                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold text-lg">{s.num}</span>
                                    <span className="text-gray-700 font-medium">{s.text}</span>
                                </div>
                                {i < steps.length - 1 && (
                                    <span className="hidden md:block text-2xl text-gray-300">→</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Rewards */}
                    <h3 className="text-xl font-bold text-brand-dark text-center mb-8">Reward Logic</h3>
                    <div className="grid sm:grid-cols-3 gap-6 mb-10">
                        {rewards.map((r, i) => (
                            <div key={i} className="text-center bg-brand-cream rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                                <span className="text-4xl block mb-3">{r.icon}</span>
                                <p className="text-2xl font-bold text-brand-teal mb-2">{r.points}</p>
                                <p className="text-gray-700">{r.label}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-lg text-gray-700 font-medium bg-teal-50 rounded-xl p-5">
                        🎯 Students engage willingly, try your product, and <strong>remember your brand</strong>.
                    </p>
                </div>
            </section>

            {/* ─── PROMOTION PLANS ─── */}
            <section id="plans" className="py-20 md:py-28 bg-brand-cream">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark text-center mb-4">Promotion Plans</h2>
                    <p className="text-gray-600 text-center mb-14 text-lg">Choose the plan that fits your brand and budget.</p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plans.map((plan, i) => (
                            <div key={i} className={`relative bg-white rounded-2xl p-6 border-2 ${plan.color} shadow-sm hover:shadow-lg transition-shadow flex flex-col`}>
                                {plan.popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                                        POPULAR
                                    </span>
                                )}
                                <span className={`inline-block self-start text-xs font-bold px-3 py-1 rounded-full mb-4 ${plan.badge}`}>
                                    {plan.price}
                                </span>
                                <h3 className="text-xl font-bold text-brand-dark mb-4">{plan.name}</h3>
                                <ul className="space-y-3 flex-grow">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-2 text-gray-700 text-sm">
                                            <span className="text-brand-teal mt-0.5">✓</span>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className="mt-6 block w-full text-center bg-brand-teal text-white font-semibold py-3 rounded-full hover:bg-teal-600 transition-all shadow-sm hover:shadow-md text-sm"
                                    onClick={() => handlePlanClick(plan.name)}
                                >
                                    Get Started
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FLEXIBLE PRICING ─── */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">Flexible &amp; Negotiable 🤝</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        We understand that every brand has a different budget and marketing goal.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-6 mb-8">
                        {[
                            { icon: '💰', text: 'Pricing is flexible' },
                            { icon: '🛠️', text: 'Plans can be customised' },
                            { icon: '📋', text: 'Deliverables can be adjusted' },
                        ].map((item, i) => (
                            <div key={i} className="bg-brand-cream rounded-xl p-5">
                                <span className="text-3xl block mb-2">{item.icon}</span>
                                <p className="text-gray-700 font-medium">{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        Share your budget range and expectations, and we'll suggest the <strong>best possible plan</strong> for your brand.
                    </p>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section id="contact" className="py-20 md:py-28 bg-gradient-to-br from-teal-600 to-teal-700 text-white text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-5">Let's Collaborate 🤝</h2>
                    <p className="text-lg text-teal-100 mb-10">
                        Want your brand to be part of our next college stall?
                    </p>
                    <a href={CTA_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-brand-teal font-bold px-10 py-4 rounded-full text-lg hover:bg-teal-50 transition-all shadow-xl hover:shadow-2xl">
                        Include My Brand
                    </a>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="bg-brand-dark text-gray-400 py-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-white font-serif font-bold text-lg mb-1">EKTHAA</p>
                        <p className="text-sm">Building better discovery for local businesses.</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="WhatsApp">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                        <a href={EMAIL_LINK} className="hover:text-white transition-colors" aria-label="Email">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </a>
                        <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </a>
                    </div>
                    <p className="text-sm text-gray-500">© {new Date().getFullYear()} Ekthaa. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default EventsLanding;
