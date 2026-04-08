/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check } from "lucide-react";
import Slider from "rc-slider";
import { useState } from "react";
import Collapsible from "./Collapsible";

interface CheckboxProps {
    label: string;
    filters?: any;
    setFilters?: any;
}

function CheckboxItem({ label, filters, setFilters }: CheckboxProps) {
    const [checked, setChecked] = useState(false);

    return (
        <label className="flex items-center gap-2 cursor-pointer mb-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="w-4 h-4 rounded"
            />
            <span className="text-sm text-white-300">{label}</span>
        </label>
    );
}

export default function Sidebar({ filters, setFilters }: any) {
    const [size, setSize] = useState([4000, 6000]);
    const [price, setPrice] = useState([10000, 40000]);
    const [open, setOpen] = useState({
        developer: true,
        amenities: true,
    });

    return (
        <div className="w-[300px] rounded-[28px] border border-yellow-500/20 bg-gradient-to-b from-[#0c0c0c] to-[#111] p-6 shadow-[0_0_30px_rgba(250,204,21,0.05)]">
            <h2 className="text-2xl font-semibold mb-6">Filters</h2>

            <Collapsible title="Category" open={true} toggle={() => { }}>
                <CheckboxItem label="Elite" filters={filters} setFilters={setFilters} />
                <CheckboxItem label="Luxury" filters={filters} setFilters={setFilters} />
                <CheckboxItem label="Ultra Luxury" filters={filters} setFilters={setFilters} />
            </Collapsible>

            <div className="mb-7">
                <p className="text-sm uppercase tracking-[0.14em] text-white-400 mb-3">Size</p>
                <div className="flex justify-between text-xs mb-3 text-white-300">
                    <span>{size[0].toLocaleString()} sq. ft.</span>
                    <span>{size[1].toLocaleString()} sq. ft.</span>
                </div>
                <Slider
                    range
                    min={1000}
                    max={10000}
                    value={size}
                    onChange={(val: any) => setSize(val)}
                    trackStyle={[{ backgroundColor: "#d4a373" }]}
                    handleStyle={[
                        { borderColor: "#d4a373", backgroundColor: "#d4a373" },
                        { borderColor: "#d4a373", backgroundColor: "#d4a373" },
                    ]}
                />
            </div>

            <div className="mb-7">
                <p className="text-sm uppercase tracking-[0.14em] text-white-400 mb-3">Price Range</p>
                <div className="flex justify-between text-xs mb-3 text-white-300">
                    <span>{price[0].toLocaleString()} AED</span>
                    <span>{price[1].toLocaleString()} AED</span>
                </div>
                <Slider
                    range
                    min={1000}
                    max={100000}
                    value={price}
                    onChange={(val: any) => setPrice(val)}
                    trackStyle={[{ backgroundColor: "#d4a373" }]}
                    handleStyle={[
                        { borderColor: "#d4a373", backgroundColor: "#d4a373" },
                        { borderColor: "#d4a373", backgroundColor: "#d4a373" },
                    ]}
                />
            </div>

            <Collapsible
                title="Developer"
                open={open.developer}
                toggle={() => setOpen((prev) => ({ ...prev, developer: !prev.developer }))}
            >
                {["DAMAC", "Emaar", "Meraas", "XYZ Properties"].map((d) => (
                    <CheckboxItem key={d} label={d} />
                ))}
            </Collapsible>

            <Collapsible
                title="Amenities"
                open={open.amenities}
                toggle={() => setOpen((prev) => ({ ...prev, amenities: !prev.amenities }))}
            >
                {["Swimming Pool", "Lounge", "Play Area", "Park", "Cinema"].map((a) => (
                    <CheckboxItem key={a} label={a} />
                ))}
            </Collapsible>
        </div>
    );
}