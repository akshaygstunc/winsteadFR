/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function SearchBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  
  const [values, setValues] = useState({
    type: "",
    bedrooms: "",
    location: "",
  });
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (values.location) params.append("location", values.location);
    if (values.type) params.append("type", values.type);
    if (values.bedrooms) params.append("bedrooms", values.bedrooms.split(" ")[0]);
    console.log(params.toString());
    router.push(`/projects?${params.toString()}`);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);



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
  const [propertyTypes, setPropertyTypes] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([
    {
      key: "type",
      label: "Property Type",
      icon: "/home.png",
      options: propertyTypes, // objects now
    },
    {
      key: "bedrooms",
      label: "Bedrooms",
      icon: "/bed.png",
      options: ["1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom", "5+ Bedroom"],
    },
    {
      key: "location",
      label: "Location",
      icon: "/location.png",
      options: locations, // objects now
    },
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typeRes, locationRes] = await Promise.all([
          fetch("https://winsteadglobal.com/api/content/property-types"),
          fetch("https://winsteadglobal.com/api/content/locations"),
        ]);

        const typeData = await typeRes.json();
        const locationData = await locationRes.json();
        const typeDataupdate = typeData.filter((item: any) => item.title !== "Ultra Luxury");
        setFields((prevFields) =>
          prevFields.map((field) => {
            if (field.key === "type") {
              return { ...field, options: typeDataupdate };
            } else if (field.key === "location") {
              return { ...field, options: locationData };
            }
            return field;
          })
        );

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  // const fields = [
  //   {
  //     key: "type",
  //     label: "Property Type",
  //     icon: "/home.png",
  //     options: propertyTypes, // objects now
  //   },
  //   {
  //     key: "bedrooms",
  //     label: "Bedrooms",
  //     icon: "/bed.png",
  //     options: ["1 BHK", "2 BHK", "3 BHK"],
  //   },
  //   {
  //     key: "location",
  //     label: "Location",
  //     icon: "/location.png",
  //     options: locations, // objects now
  //   },
  // ];
  return (
    <div ref={dropdownRef} className="flex flex-col items-center gap-2 sm:gap-6 w-full">
      {/* INPUT ROW */}
     <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
        {fields.map((item, i) => (
         <div key={i} className="relative w-full sm:flex-1">
            {/* FIELD */}
            <div
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
             className="cursor-pointer border border-yellow-500/40 rounded-2xl px-2 py-2 flex items-center bg-black/60 backdrop-blur-md hover:border-yellow-500 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3 w-full">
                <img
                  src={item.icon}
                  className="w-6 h-6 sm:w-10 sm:h-10 rounded-full border border-yellow-500/30 shadow-[0_0_15px_rgba(201,162,74,0.3)]"
                />

                <div className="text-[1.05rem] sm:text-md lg:text-md text-[#F5F5F5] font-semibold flex justify-between w-full">
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
              <div className="absolute mt-2 w-full bg-black border border-yellow-500/30 rounded-xl shadow-lg z-10">
                {/* {console.log(item.options)} */}
                {item.options.map((opt: any, idx: number) => {
                  let label = "";
                  let value: string = "";

                  if (item.key === "type") {
                    label = opt.title;     // ✅ show title
                    value = opt.title;       // ✅ store ID
                  } else if (item.key === "location") {
                    label = opt.title;     // ✅ show title
                    value = opt.title;      // ✅ store slug (BEST)
                  } else {
                    label = opt;
                    value = opt;
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelect(item.key, value)}
                      className="px-4 py-3 hover:bg-yellow-500/10 cursor-pointer"
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      <button
        onClick={handleSearch}
          className="text-[1.05rem] bg-gradient-to-r from-yellow-300 to-yellow-600 text-sm lg:text-md lg:text-md sm:text-md lg:text-md px-2
         sm:px-10 py-3 w-full sm:w-auto rounded-xl text-black font-semibold
          hover:scale-105 transition shadow-[0_0_20px_rgba(201,162,74,0.4)]"
      >
        Search
      </button>
      </div>

      {/* BUTTON */}
    </div>
  );
}
