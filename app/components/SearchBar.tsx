"use client";
import { useState, useRef, useEffect } from "react";

export default function SearchBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [values, setValues] = useState({
    type: "",
    bedrooms: "",
    location: "",
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const fields = [
    {
      key: "type",
      label: "Property Type",
      icon: "/home.png",
      options: ["Villa", "Apartment", "Studio"],
    },
    {
      key: "bedrooms",
      label: "Bedrooms",
      icon: "/bed.png",
      options: ["1 BHK", "2 BHK", "3 BHK"],
    },
    {
      key: "location",
      label: "Location",
      icon: "/location.png",
      options: ["Dubai", "London", "New York"],
    },
  ];

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // HANDLE SELECT
  const handleSelect = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setOpenIndex(null);
  };

  // HANDLE SEARCH
  const handleSearch = () => {
    console.log("Search Values:", values);

    // 👉 Replace with API call later
    alert(
      `Searching for:
      Type: ${values.type}
      Bedrooms: ${values.bedrooms}
      Location: ${values.location}`,
    );
  };

  return (
    <div ref={dropdownRef} className="flex flex-col items-center gap-6 w-full">
      {/* INPUT ROW */}
      <div className="flex gap-6 w-full">
        {fields.map((item, i) => (
          <div key={i} className="relative flex-1">
            {/* FIELD */}
            <div
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="cursor-pointer border border-yellow-500/40 rounded-2xl px-6 py-5 flex items-center bg-black/60 backdrop-blur-md hover:border-yellow-500 transition"
            >
              {/* LEFT */}
              <div className="flex flex-col gap-3 w-full">
                <img
                  src={item.icon}
                  className="w-10 h-10 rounded-full border border-yellow-500/30 shadow-[0_0_15px_rgba(201,162,74,0.3)] p-1"
                />

                <div className="text-md text-[#F5F5F5] font-semibold flex justify-between w-full">
                 <span> {values[item.key as keyof typeof values] || item.label}</span>
                  <div
                    className={`transition ${openIndex === i ? "rotate-180" : ""}`}
                  >
                    ▾
                  </div>
                </div>
              </div>

              {/* ARROW */}
            </div>

            {/* DROPDOWN */}
            {openIndex === i && (
              <div className="absolute mt-2 w-full bg-black border border-yellow-500/30 rounded-xl shadow-lg z-50">
                {item.options.map((opt, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelect(item.key, opt)}
                    className="px-4 py-3 hover:bg-yellow-500/10 cursor-pointer text-sm"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSearch}
        className="bg-gradient-to-r from-yellow-300 to-yellow-600 px-10 py-3 rounded-xl text-black font-semibold hover:scale-105 transition shadow-[0_0_20px_rgba(201,162,74,0.4)]"
      >
        Search
      </button>
    </div>
  );
}
