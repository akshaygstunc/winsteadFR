import Image from "next/image";
import banner from "../../public/services.png"; // use your banner

export default function ContactUs() {
  return (
    <div className="bg-black text-white">
      {/* 🔥 HEADER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-4">
        <h1 className="text-3xl md:text-4xl font-semibold animate-fadeUp">
          Contact Us
        </h1>
      </div>

      {/* 🔥 BANNER */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <Image
          src={banner}
          alt="Contact Banner"
          fill
          className="object-cover animate-zoomIn"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black" />
      </div>

      {/* 🔥 FORM SECTION */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 text-center">
        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-semibold animate-fadeUp">
          Register Your Interest in
        </h2>
        <h3
          className="text-2xl md:text-3xl font-semibold mb-10 animate-fadeUp
bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] bg-clip-text text-transparent"
        >
          Aurelia Heights
        </h3>

        {/* FORM */}
        <form className="space-y-5 text-left">
          {/* FULL NAME */}
          <div className="animate-fadeUp">
            <label className="text-sm mb-2 block">Full Name</label>
            <input
              placeholder="Enter your full name"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-[#F1DC7F] focus:shadow-[0_0_10px_rgba(241,220,127,0.15)] transition"
            />
          </div>

          {/* PHONE + EMAIL */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="animate-fadeUp">
              <label className="text-sm mb-2 block">Phone</label>
              <div className="flex items-center bg-white/10 border border-white/10 rounded-xl px-3 py-3">
                {/* FLAG */}
                <div className="w-6 h-4 mr-2 bg-[linear-gradient(to_bottom,#00732f_33%,#fff_33%,#fff_66%,#000_66%)]" />

                <span className="text-gray-300 mr-2">+971</span>

                <input
                  className="bg-transparent outline-none flex-1 "
                  placeholder="Enter phone"
                />
              </div>
            </div>

            <div className="animate-fadeUp">
              <label className="text-sm mb-2 block">Email</label>
              <input
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-[#F1DC7F] focus:shadow-[0_0_10px_rgba(241,220,127,0.15)] transition"
              />
            </div>
          </div>

          {/* SELECTS */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="animate-fadeUp">
              <label className="text-sm mb-2 block">Project Type</label>
              <select className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-[#F1DC7F] focus:shadow-[0_0_10px_rgba(241,220,127,0.15)]">
                <option>Apartment</option>
                <option>Villa</option>
              </select>
            </div>

            <div className="animate-fadeUp">
              <label className="text-sm mb-2 block">Bedrooms</label>
              <select className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-[#F1DC7F] focus:shadow-[0_0_10px_rgba(241,220,127,0.15)]">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            className="w-full mt-6 py-4 rounded-2xl 
bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] 
text-black text-lg font-semibold 
hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(241,220,127,0.25)]
transition-all duration-300 animate-fadeUp"
          >
            Submit
          </button>

          {/* FOOTER TEXT */}
          <p className="text-xs text-gray-500 text-center mt-4 animate-fadeUp">
            By submitting this form, you agree to our{" "}
            <span className="bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] bg-clip-text text-transparent">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] bg-clip-text text-transparent">
              Privacy Policy
            </span>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
