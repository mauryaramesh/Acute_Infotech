import React from 'react';

const AboutUsStory: React.FC = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-[1200px] mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            A Decade of <span className="text-blue-600">Digital Excellence</span>
                        </h2>
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                            <p>
                                Acute InfoSoft commenced operations with a small but passionate team, driven by a vision to redefine digital solutions. With unwavering dedication, we secured our first major project within a month of incorporation, setting the stage for specific growth and unprecedented opportunities.
                            </p>
                            <p>
                                Over the years, we have evolved from a mobile-first agency into a full-cycle digital transformation partner for our clients. We strengthened our workforce, hiring top talents from across locations, and expanded our expertise into emerging technologies like AI/ML and Blockchain.
                            </p>
                            <p>
                                Our consistent client-first approach and commitment to innovation have earned us recognition as a trusted technology partner globally. Today, we continue to push boundaries, helping businesses transform their ideas into scalable, impactful digital products.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-60"></div>

                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Team meeting"
                                className="rounded-2xl shadow-xl w-full h-64 object-cover transform translate-y-8"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1553877615-30c73e63cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Modern office"
                                className="rounded-2xl shadow-xl w-full h-64 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsStory;
