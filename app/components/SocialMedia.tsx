import {
    FaDiscord,
    FaInstagram,
    FaXTwitter,
    FaYoutube,
    FaLinkedinIn,
} from "react-icons/fa6";

export default function FollowUsIcons() {
    const socials = [
        {
            name: "Instagram",
            icon: <FaInstagram />,
            link: "https://instagram.com",
        },
        {
            name: "X",
            icon: <FaXTwitter />,
            link: "https://x.com",
        },
        {
            name: "YouTube",
            icon: <FaYoutube />,
            link: "https://youtube.com",
        },
        {
            name: "LinkedIn",
            icon: <FaLinkedinIn />,
            link: "https://linkedin.com",
        },
    ];

    return (
        <div className="">
         

            <div className="flex flex-wrap items-center gap-3">
                {socials.map((item) => (
                    <a
                        key={item.name}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name}
                        className="w-8 h-8 rounded-full border border-yellow-500/60 flex items-center justify-center text-yellow-400 text-lg hover:bg-yellow-500 hover:text-black transition duration-300"
                    >
                        {item.icon}
                    </a>
                ))}
            </div>
        </div>
    );
}