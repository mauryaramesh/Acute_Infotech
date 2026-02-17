"use client";

import React from "react";

const steps = [
    {
        id: 1,
        title: "Requirement Gathering",
        description: "Strategic insights shaping clear project direction.",
        colSpan: "lg:col-start-1 lg:row-start-1",
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    {
        id: 2,
        title: "Analysis & Planning",
        description: "Structured planning for efficient, scalable outcomes.",
        colSpan: "lg:col-start-2 lg:row-start-1",
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        id: 3,
        title: "Design",
        description: "User-centric designs crafted for lasting impact.",
        colSpan: "lg:col-start-3 lg:row-start-1",
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        ),
    },
    {
        id: 4,
        title: "Development",
        description: "Robust engineering powering reliable digital solutions.",
        colSpan: "lg:col-start-4 lg:row-start-1",
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    },
    {
        id: 5,
        title: "Testing & QA",
        description: "Precision testing ensuring uncompromised performance.",
        colSpan: "lg:col-start-4 lg:row-start-2",
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
    },
    {
        id: 6,
        title: "Deployment",
        description: "Seamless deployment enabling smooth go-live operations.",
        colSpan: "lg:col-start-3 lg:row-start-2",
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        id: 7,
        title: "Maintenance & Support",
        description: "Proactive support sustaining long-term product excellence.",
        colSpan: "lg:col-start-2 lg:row-start-2",
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
    },
];

const WorkingProcess: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorative Blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none -z-10" />

            <div className="max-w-[1200px] mx-auto px-8">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-blue-600 font-medium py-1 px-3 text-sm rounded-full border border-blue-100 bg-blue-50 mb-4">
                        Working Process
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Our Approach to Success
                    </h2>
                    <p className="text-gray-500 max-w-lg text-lg">
                        We follow a structured, step-by-step approach to deliver efficient and tailored IT solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative items-start">

                    {/* Connecting Lines for Desktop */}
                    <div className="hidden lg:block absolute inset-0 pointer-events-none">
                        {/* 1->2 */}
                        <svg className="absolute top-[80px] left-[20%] w-[10%] h-[20px] text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 100 10">
                            <path strokeDasharray="6 4" strokeWidth="2" d="M0 5 H100" />
                            <path fill="currentColor" d="M95 0 L100 5 L95 10 Z" />
                        </svg>
                        {/* 2->3 */}
                        <svg className="absolute top-[80px] left-[45%] w-[10%] h-[20px] text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 100 10">
                            <path strokeDasharray="6 4" strokeWidth="2" d="M0 5 H100" />
                            <path fill="currentColor" d="M95 0 L100 5 L95 10 Z" />
                        </svg>
                        {/* 3->4 */}
                        <svg className="absolute top-[80px] left-[70%] w-[10%] h-[20px] text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 100 10">
                            <path strokeDasharray="6 4" strokeWidth="2" d="M0 5 H100" />
                            <path fill="currentColor" d="M95 0 L100 5 L95 10 Z" />
                        </svg>

                        {/* 4->5 (Down) */}
                        <svg className="absolute top-[180px] right-[10%] w-[20px] h-[80px] text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 10 100">
                            <path strokeDasharray="6 4" strokeWidth="2" d="M5 0 V100" />
                            <path fill="currentColor" d="M0 95 L5 100 L10 95 Z" />
                        </svg>

                        {/* 5->6 (Left) */}
                        <svg className="absolute bottom-[100px] left-[70%] w-[10%] h-[20px] text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 100 10">
                            <path strokeDasharray="6 4" strokeWidth="2" d="M100 5 H0" />
                            <path fill="currentColor" d="M5 0 L0 5 L5 10 Z" />
                        </svg>
                        {/* 6->7 (Left) */}
                        <svg className="absolute bottom-[100px] left-[45%] w-[10%] h-[20px] text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 100 10">
                            <path strokeDasharray="6 4" strokeWidth="2" d="M100 5 H0" />
                            <path fill="currentColor" d="M5 0 L0 5 L5 10 Z" />
                        </svg>

                        {/* 7->1 (Up and Left Curve) - Complex, simplifying to an Up-Left arrow */}
                        <svg className="absolute bottom-[180px] left-[20%] w-[60px] h-[100px] text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 60 100">
                            <path strokeDasharray="6 4" strokeWidth="2" d="M30 100 V50 Q30 0 0 20" />
                            {/* Visual approximation of the loop back */}
                            <path fill="currentColor" d="M5 15 L0 20 L5 25 Z" />
                        </svg>

                    </div>

                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className={`group bg-white border border-gray-100 rounded-[2rem] p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-start h-full min-h-[280px] relative z-10 ${step.colSpan}`}
                        >
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkingProcess;
