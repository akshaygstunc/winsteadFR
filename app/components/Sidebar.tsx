"use client";

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ChevronDown } from "lucide-react";

export default function Sidebar({ filters, setFilters }: any) {
  const [size, setSize] = useState([4000, 6000]);
  const [price, setPrice] = useState([10000, 40000]);

  const [open, setOpen] = useState({
    developer: true,
    amenities: true,
  });

  return (
    <div className="w-[300px] bg-gradient-to-b from-[#0c0c0c] to-[#111] p-6 rounded-2xl border border-white/10">

      <h2 className="text-xl font-semibold mb-6">Filters</h2>

      {/* CATEGORY */}
      <Section title="Category">
        {["Elite", "Luxury", "Ultra Luxury"].map((cat) => (
          <Check
            key={cat}
            label={cat}
            filters={filters}
            setFilters={setFilters}
          />
        ))}
      </Section>

      {/* SIZE */}
      <RangeSlider
        title="Size"
        value={size}
        setValue={setSize}
        min={1000}
        max={10000}
        unit="sq. ft."
      />

      {/* PRICE */}
      <RangeSlider
        title="Price Range"
        value={price}
        setValue={setPrice}
        min={1000}
        max={100000}
        unit="AED"
      />

      {/* DEVELOPER */}
      <Collapsible
        title="Developer"
        open={open.developer}
        toggle={() =>
          setOpen((prev) => ({ ...prev, developer: !prev.developer }))
        }
      >
        {["DAMAC", "Emaar", "Meraas"].map((d) => (
          <Check key={d} label={d} />
        ))}
      </Collapsible>

      {/* AMENITIES */}
      <Collapsible
        title="Amenities"
        open={open.amenities}
        toggle={() =>
          setOpen((prev) => ({ ...prev, amenities: !prev.amenities }))
        }
      >
        {["Pool", "Gym", "Park"].map((a) => (
          <Check key={a} label={a} />
        ))}
      </Collapsible>
    </div>
  );
}

/* 🔥 REUSABLE COMPONENTS */

function Section({ title, children }: any) {
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-400 mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Check({ label, filters, setFilters }: any) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer group">
      <input
        type="checkbox"
        checked={filters?.category === label}
        onChange={() =>
          setFilters &&
          setFilters((prev: any) => ({
            ...prev,
            category: prev.category === label ? "" : label,
          }))
        }
        className="w-4 h-4"
      />
      <span className="text-gray-300 group-hover:text-white">{label}</span>
    </label>
  );
}

function Collapsible({ title, children, open, toggle }: any) {
  return (
    <div className="mb-6">
      <div
        onClick={toggle}
        className="flex justify-between items-center cursor-pointer mb-3"
      >
        <p className="text-sm text-gray-400">{title}</p>
        <ChevronDown className={`${open ? "rotate-180" : ""}`} />
      </div>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

function RangeSlider({ title, value, setValue, min, max, unit }: any) {
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-400 mb-3">{title}</p>

      <div className="flex justify-between text-xs mb-2">
        <span>{value[0].toLocaleString()} {unit}</span>
        <span>{value[1].toLocaleString()} {unit}</span>
      </div>

      <Slider
        range
        min={min}
        max={max}
        value={value}
        onChange={(val: any) => setValue(val)}
      />
    </div>
  );
}