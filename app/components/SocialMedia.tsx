import {
  FaDiscord,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaFacebookF,
  FaPinterest,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa6";

export default function FollowUsIcons() {
  const socials = [
    // {
    //   name: "Facebook",
    //   icon: <FaFacebookF />,
    //   link: "https://www.facebook.com/winsteadglobalrealestate",
    // },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      link: "https://www.instagram.com/winsteadglobal/",
    },
    {
      name: "Twitter (X)",
      icon: <FaXTwitter />,
      link: "https://x.com/winsteadglobal",
    },
    // {
    //   name: "Pinterest",
    //   icon: <FaPinterest />,
    //   link: "https://in.pinterest.com/winsteadglobal/",
    // },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      link: "https://www.youtube.com/@WinsteadGlobal",
    },
    {
      name: "TikTok",
      icon: <FaTiktok />,
      link: "https://www.tiktok.com/@winsteadglobal",
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
