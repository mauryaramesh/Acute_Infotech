"use client";

import React from "react";

const testimonials = [
    {
        id: 1,
        name: "Brett Bruhler",
        role: "",
        feedback:
            "Ramesh did a great job designing some of our website’s assets. He was quick with his initial designs and came back to us with revisions when we needed them.",
        avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2024/08/Brett-Bruhler.png",
    },
    {
        id: 2,
        name: "Daria Kalinicheva",
        role: "Marketing Head",
        feedback:
            "The website you guys built is of superior quality and deliver consistent outstanding user experiences, & meet customers’ expectations. Impressed with their professionalism.",
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
        <section className="py-20 bg-white">
            <div className="max-w-[1200px] mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it. Here is what some of our partners have to say about working with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col justify-between animate-fade-in-up animation-delay-${(index % 3) * 200}`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div>
                                <div className="flex items-center mb-6">
                                    <img
                                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                    />
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 leading-tight">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {testimonial.role || "Client"}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <svg
                                        className="w-8 h-8 text-blue-400 mb-2 opacity-80"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M14.017 21L14.017 18C14.017 16.896 14.321 15.292 14.857 14.124C15.393 12.919 16.326 12.031 17.656 11.459C17.771 11.408 17.882 11.353 17.989 11.296C17.791 11.233 17.585 11.198 17.373 11.198C15.938 11.198 14.775 12.361 14.775 13.796V14.796H10.775V8.796H16.775V2.796H8.775V16.796C8.775 19.117 11.122 21 14.017 21ZM5.017 21L5.017 18C5.017 16.896 5.321 15.292 5.857 14.124C6.393 12.919 7.326 12.031 8.656 11.459C8.771 11.408 8.882 11.353 8.989 11.296C8.791 11.233 8.585 11.198 8.373 11.198C6.938 11.198 5.775 12.361 5.775 13.796V14.796H1.775V8.796H7.775V2.796H-0.225V16.796C-0.225 19.117 2.122 21 5.017 21Z" />
                                    </svg>
                                </div>

                                <p className="text-gray-700 text-base leading-relaxed">
                                    {testimonial.feedback}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientFeedback;
