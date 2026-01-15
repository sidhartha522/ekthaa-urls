import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BENEFITS = [
    { icon: 'fa-briefcase', title: 'Great Opportunities', description: 'Work on cutting-edge projects and grow your skills' },
    { icon: 'fa-users', title: 'Amazing Team', description: 'Collaborate with talented professionals' },
    { icon: 'fa-chart-line', title: 'Career Growth', description: 'Clear paths for advancement and skill development' },
    { icon: 'fa-heart', title: 'Work-Life Balance', description: 'Flexible hours and remote work options' }
];

const POSITIONS = [
    {
        id: 1,
        title: 'AI Chatbot Developer',
        type: 'Internship',
        location: 'Remote',
        description: 'Build an intelligent conversational AI assistant for product discovery using RAG, Python, and LLM APIs.',
        duration: '2 months',
        commitment: '15-20 hrs/week'
    },
    {
        id: 2,
        title: 'Frontend Intern (React)',
        type: 'Internship',
        location: 'Remote',
        description: 'Work on modern React applications and learn from experienced developers.',
        duration: '2 months',
        commitment: '15-20 hrs/week'
    },
    {
        id: 3,
        title: 'Backend Intern (Python + Flask)',
        type: 'Internship',
        location: 'Remote',
        description: 'Build scalable backend services and APIs using Python and Flask.',
        duration: '2 months',
        commitment: '15-20 hrs/week'
    },
    {
        id: 4,
        title: 'Full Stack Intern',
        type: 'Internship',
        location: 'Remote',
        description: 'Get hands-on experience with both frontend and backend development.',
        duration: '2 months',
        commitment: '15-20 hrs/week'
    },
    {
        id: 5,
        title: 'Startup Builder Intern',
        type: 'Internship',
        location: 'Remote',
        description: 'Help build ekthaa from the ground up. Perfect for entrepreneurial minds who want to experience startup life.',
        duration: 'Flexible',
        commitment: '10-15 hrs/week'
    }
];

const CareersNew = () => {
    const navigate = useNavigate();

    const handleApply = () => {
        window.open('https://internships.ekthaa.app', '_blank');
    };

    return (
        <div className="min-h-screen bg-brand-cream">
            {/* Hero */}
            <div className="bg-gradient-to-r from-brand-teal to-teal-600 text-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Join Our Team</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Build your career with us and work on exciting projects that make a difference
                    </p>
                </div>
            </div>

            {/* Why Work With Us */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-serif font-bold text-brand-dark text-center mb-12">Why Work With Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {BENEFITS.map((benefit, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige text-center group hover:shadow-md transition">
                            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-teal transition">
                                <i className={`fas ${benefit.icon} text-brand-teal text-xl group-hover:text-white transition`}></i>
                            </div>
                            <h4 className="font-bold text-brand-dark mb-2">{benefit.title}</h4>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Open Positions */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold text-brand-dark text-center mb-12">Open Positions</h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {POSITIONS.map((position) => (
                            <div
                                key={position.id}
                                className="bg-brand-cream rounded-xl p-6 border border-brand-beige hover:shadow-md transition"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-brand-dark text-lg">{position.title}</h3>
                                            <span className="px-3 py-1 bg-teal-100 text-brand-teal text-xs font-medium rounded-full">
                                                {position.type}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                                            <div className="flex items-center gap-1">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <span>{position.location}</span>
                                            </div>
                                            {position.duration && (
                                                <div className="flex items-center gap-1">
                                                    <i className="fas fa-clock"></i>
                                                    <span>{position.duration}</span>
                                                </div>
                                            )}
                                            {position.commitment && (
                                                <div className="flex items-center gap-1">
                                                    <i className="fas fa-calendar-alt"></i>
                                                    <span>{position.commitment}</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm">{position.description}</p>
                                    </div>
                                    <button
                                        onClick={handleApply}
                                        className="px-6 py-2 bg-brand-teal text-white rounded-lg font-medium hover:bg-teal-600 transition whitespace-nowrap"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-gradient-to-r from-brand-teal to-teal-600 rounded-2xl p-8 md:p-12 text-white text-center">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">Don't see a position that fits?</h3>
                    <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
                        We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
                    </p>
                    <a
                        href="mailto:hr@ekthaa.app"
                        className="inline-block bg-white text-brand-teal px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                    >
                        <i className="fas fa-envelope mr-2"></i>
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CareersNew;
