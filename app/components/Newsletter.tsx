import Image from "next/image";
import winstead from "../../public/logo.png";
export default function Newsletter() {
  return (
    <div className="px-10 py-20 grid grid-cols-2 items-center">

      {/* LEFT */}
      <div>
         <Image src={winstead} alt="logo"/>
        <h2 className="text-4xl mb-4">
          Get exclusive <br /> property updates in <br /> your inbox.
        </h2>

        <div className="flex mt-4">
          <input
            placeholder="Email"
            className="bg-transparent border border-yellow-500 px-4 py-2 w-64 rounded-l-md outline-none"
          />

          <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-2 text-black rounded-r-md">
            Get Newsletter
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex justify-end text-sm gap-20">

        <div>
          <h4 className="mb-3 text-gray-400">COMPANY</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Contact Us</p>
          <p>Pricing</p>
          <p>Blog</p>
        </div>

        <div>
          <h4 className="mb-3 text-gray-400">CONNECT</h4>
          <p>Discord</p>
          <p>Instagram</p>
          <p>X</p>
          <p>YouTube</p>
          <p>LinkedIn</p>
        </div>

      </div>
    </div>
  );
}