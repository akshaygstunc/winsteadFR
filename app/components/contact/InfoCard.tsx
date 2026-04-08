export default function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-yellow-400 text-lg mb-3">{icon}</div>
            <p className="text-xs uppercase tracking-[0.18em] text-white-500 mb-1">
                {label}
            </p>
            <p className="text-sm text-white-300 leading-relaxed">{value}</p>
        </div>
    );
}