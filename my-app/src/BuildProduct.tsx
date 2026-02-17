"use client";

import React from "react";

const BuildProduct: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1200px] mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-fade-in-up">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Build your next <br />
                            <span className="text-blue-600">product with us</span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p className="font-medium text-gray-800 border-l-4 border-blue-500 pl-4">
                                Whether your idea is still in the very early stage or has already proven its worth to hundreds of users.
                            </p>

                            <p>
                                We like thinking about your business goals, pointing out user needs and helping you to express your brand. We can do it all. Research to concept. Design to development.
                            </p>

                            <p>
                                Oh, and you will get your hands dirty as well. Actually you’re practically joining our team when you decide to work with us. By adding your (team’s) skillset to your own, we know we can crack any challenge. Go Home Avengers.
                            </p>
                        </div>

                        <div className="pt-4">
                            <a
                                href="/about-us"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                            >
                                More About Us
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="relative">
                        {/* Background decorative elements */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            <div className="col-span-2 space-y-4">
                                <img
                                    src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-1.png"
                                    alt="Team collaboration"
                                    className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                                />
                            </div>
                            <div className="pt-8">
                                <img
                                    src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-2.png"
                                    alt="Development process"
                                    className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform translate-y-4"
                                />
                            </div>
                            <div>
                                <img
                                    src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-3.png"
                                    alt="Product launch"
                                    className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuildProduct;
