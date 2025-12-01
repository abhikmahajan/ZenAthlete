import { Linkedin, Twitter, Youtube } from 'lucide-react';
import logo from '../assets/zen_logo.png'
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-black">
                <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
                    <a>
                        <img src={logo} alt="ZenAthlete Logo" className="h-10 w-auto"/>
                    </a>
                    <div>
                        <p className="text-slate-100 font-semibold">Product</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-indigo-600 transition">Home</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Support</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Pricing</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Affiliate</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-slate-100 font-semibold">Resources</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-indigo-600 transition">Company</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Blogs</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Community</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Careers<span className="text-xs text-white bg-indigo-600 rounded-md ml-2 px-2 py-1">We’re hiring!</span></a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">About</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-slate-100 font-semibold">Legal</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-indigo-600 transition">Privacy</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
                    <p className="max-w-60">Making every customer feel valued—no matter the size of your audience.</p>
                    <div className="flex items-center gap-4 mt-3">
                        <a href="https://dribbble.com/prebuiltui" target="_blank" rel="noreferrer">
                            
                        </a>
                        <a href="https://www.linkedin.com/company/prebuiltui" target="_blank" rel="noreferrer">
                            <Linkedin className="hover:text-indigo-500" />
                        </a>
                        <a href="https://x.com/prebuiltui" target="_blank" rel="noreferrer">
                            <Twitter className="hover:text-indigo-500" />
                        </a>
                        <a href="https://www.youtube.com/@prebuiltui" target="_blank" rel="noreferrer">
                            <Youtube className="hover:text-indigo-500" />
                        </a>
                    </div>
                    <p className="mt-3 text-center">© 2025 ZenAthlete</p>
                </div>
            </footer>
        </>
    );
};