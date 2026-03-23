import Image from "next/image";
import img1 from "../../public/img1.png"; // top image
import img2 from "../../public/img2.png"; // bottom image

export default function About() {
  return (
    <section className="bg-black text-white py-10 px-12 md:px-6">
      <div className="mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE (OVAL IMAGES) */}
        <div className="flex justify-center md:justify-start">
          <div className="relative w-[260px] md:w-[320px] h-[420px] md:h-[520px] rounded-full border-2 border-yellow-500 overflow-hidden">

            {/* TOP IMAGE */}
            <div className="absolute top-0 left-0 w-full h-1/2">
              <Image
                src={img1}
                alt="about"
                className="w-full h-full object-cover"
              />
            </div>

            {/* DIVIDER */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-yellow-500/40"></div>

            {/* BOTTOM IMAGE */}
            <div className="absolute bottom-0 left-0 w-full h-1/2">
              <Image
                src={img2}
                alt="about"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="space-y-6 text-gray-300 leading-relaxed">

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            About <span className="text-yellow-400">Winstead</span>
          </h2>

          <p>
            At Winstead Global Real Estate, we believe real estate is more than
            buying, selling, or investing in property — it is about building
            futures, creating opportunities, and helping our clients make
            confident decisions with peace of mind.
          </p>

          <p>
            As a trusted name in the real estate industry, we are committed to
            delivering professional, transparent, and results-driven services
            tailored to the unique needs of every client. Whether you are searching
            for your dream home, expanding your investment portfolio, or looking
            for the right commercial opportunity, our team is dedicated to guiding
            you every step of the way with expertise and integrity.
          </p>

          <p>
            Our mission is to connect people with the right properties while
            providing a seamless and rewarding experience. We take pride in
            understanding market trends, identifying valuable opportunities, and
            offering personalized solutions that align with our clients’ goals.
          </p>

          <p>
            At the heart of Winstead Global Real Estate is our unwavering
            commitment to customer satisfaction. We understand that every client’s
            journey is different, which is why we place great importance on
            listening carefully, communicating clearly, and delivering service
            that exceeds expectations. Building long-term relationships based on
            trust, reliability, and exceptional service is what drives us every
            day.
          </p>

          <p>
            With Winstead Global Real Estate, you can expect dedication,
            professionalism, and a genuine passion for helping you succeed in
            every real estate decision.
          </p>

        </div>
      </div>
    </section>
  );
}