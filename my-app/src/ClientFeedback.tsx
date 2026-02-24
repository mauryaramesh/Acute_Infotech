"use client";

import React, { useEffect, useRef, useState } from "react";

const testimonials = [
    {
        id: 1,
        name: "Brett Bruhler",
        role: "",
        feedback:
            "Ramesh did a great job designing some of our website's assets. He was quick with his initial designs and came back to us with revisions when we needed them.",
        avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2024/08/Brett-Bruhler.png",
    },
    {
        id: 2,
        name: "Daria Kalinicheva",
        role: "Marketing Head",
        feedback:
            "The website you guys built is of superior quality and deliver consistent outstanding user experiences, & meet customers' expectations. Impressed with their professionalism.",
        avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2024/08/Daria-Kalinicheva.png",
    },
    {
        id: 3,
        name: "Vin Pam",
        role: "Company Director",
        feedback:
            "Good SEO job in off page support and generating traffic. Job done very professionally. Highly recommend Acute Infosoft. Will hire him again in the near future",
        avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2024/08/Vin-Pam.png",
    },
    {
        id: 4,
        name: "Ryan Angel",
        role: "CEO",
        feedback:
            "Ramesh tackled a problem I was dealing with regarding getting onto a blacklist that is quite virulent the UCEPROTECL 2 and UCEPROTECL 3 he got me off of it in a few hours. We got back on again and he since has helped to come up with a longer terms solution that will help keep me off the blacklists as long as we follow the rules. Thanks Ramesh for your hard work.",
        avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2022/12/client.jpeg",
    },
    {
        id: 5,
        name: "Jeniffer Doe",
        role: "Vice President",
        feedback:
            "Ramesh is a hard working person who is always ready to go some extra miles when needed. He did a great job. He is smart and reasonable and goes the extra mile without being prompted. It was a great pleasure working with him on this project. Got all what I needed within a quick turnaround time and budget. Highly recommended!",
        avatar: "https://acuteinfosoft.com/wp-content/themes/startupzy/assets/img/person-people-girl-woman-hair-photography-1172571-pxhere.com.webp",
    },
    {
        id: 6,
        name: "Claudia Doe",
        role: "Marketing Head",
        feedback:
            "Delivered excellent work on this project and I enjoyed working with him. His communication was top-notch, he met all deadlines, and his skills were reasonably strong. At one point I asked for an additional milestone and he was very forthcoming that the additional work was outside his area of expertise. I will likely have more jobs in the future.",
        avatar: "https://acuteinfosoft.com/wp-content/themes/startupzy/assets/img/person-girl-woman-hair-photography-portrait-108386-pxhere.com.webp",
    },
];

const ClientFeedback: React.FC = () => {
    return (
        <section className="bg-white py-24 md:py-32 border-t-4 border-black relative overflow-hidden">
            {/* 2D Decorative Dots */}
            <div className="absolute top-10 left-10 w-32 h-32 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#000 3px, transparent 3px)',
                    backgroundSize: '20px 20px'
                }}
            />

            <div className="max-w-[1200px] mx-auto px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-6xl font-black text-black mb-6 leading-tight uppercase tracking-tighter">
                        What Our <span className="text-blue-600 underline decoration-black decoration-4 underline-offset-8">Clients Say</span>
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                        Don't just take our word for it. Here is what some of our partners have to say about working with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Separate card component
function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
    return (
        <div className="perspective-card">
            <div className="neo-card p-10 flex flex-col justify-between h-full cursor-default bg-white">
                <div>
                    <div className="flex items-center mb-8">
                        <img
                            className="w-20 h-20 border-4 border-black neo-shadow-sm object-cover mr-6 grayscale hover:grayscale-0 transition-all duration-300"
                            src={testimonial.avatar}
                            alt={testimonial.name}
                        />
                        <div>
                            <h4 className="text-xl font-black text-black leading-tight uppercase tracking-tight">
                                {testimonial.name}
                            </h4>
                            <p className="text-sm font-bold text-blue-600 mt-1 uppercase tracking-widest">
                                {testimonial.role || "Client"}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <svg
                            className="w-10 h-10 text-black mb-2 opacity-100"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M14.017 21L14.017 18C14.017 16.896 14.321 15.292 14.857 14.124C15.393 12.919 16.326 12.031 17.656 11.459C17.771 11.408 17.882 11.353 17.989 11.296C17.791 11.233 17.585 11.198 17.373 11.198C15.938 11.198 14.775 12.361 14.775 13.796V14.796H10.775V8.796H16.775V2.796H8.775V16.796C8.775 19.117 11.122 21 14.017 21ZM5.017 21L5.017 18C5.017 16.896 5.321 15.292 5.857 14.124C6.393 12.919 7.326 12.031 8.656 11.459C8.771 11.408 8.882 11.353 8.989 11.296C8.791 11.233 8.585 11.198 8.373 11.198C6.938 11.198 5.775 12.361 5.775 13.796V14.796H1.775V8.796H7.775V2.796H-0.225V16.796C-0.225 19.117 2.122 21 5.017 21Z" />
                        </svg>
                    </div>

                    <p className="text-gray-800 text-lg font-medium leading-relaxed">
                        "{testimonial.feedback}"
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ClientFeedback;
