export default function ContactMap() {
    return (
        <div className="rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/5 backdrop-blur-sm shadow-[0_0_40px_rgba(250,204,21,0.08)]">

            {/* HEADER */}
            <div className="p-5 border-b border-white/10">
                <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-1">
                    Our Location
                </p>
                <p className="text-sm text-gray-300">
                    Dubai, United Arab Emirates
                </p>
            </div>

            {/* MAP */}
            <div className="relative h-[300px]">
                <iframe
                    src="https://www.google.com/maps?q=Dubai&output=embed"
                    className="w-full h-full border-0 grayscale contrast-125 brightness-75"
                    loading="lazy"
                ></iframe>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            </div>

            {/* FOOTER */}
            <div className="p-5">
                <button className="w-full border border-yellow-500 text-yellow-400 py-3 rounded-full hover:bg-yellow-500 hover:text-black transition">
                    Open in Google Maps
                </button>
            </div>
        </div>
    );
}