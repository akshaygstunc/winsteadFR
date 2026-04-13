/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Section({ title, children }: any) {
    return (
        <div className="mb-7">
            <p className="text-sm lg:text-xl lg:text-xl uppercase tracking-[0.14em] text-white-400 mb-3">{title}</p>
            <div className="space-y-2">{children}</div>
        </div>
    );
}