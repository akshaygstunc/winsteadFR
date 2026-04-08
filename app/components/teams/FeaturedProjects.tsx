import ProjectCard from "./ProjectCard";
import img3 from "../../../public/image_7.png";

export default function FeaturedProjects({ teamPerson }: { teamPerson: string }) {
    return (
        <section className="py-20 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                    <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                            Featured Projects
                        </p>
                        <h2 className="text-3xl md:text-4xl font-semibold">
                            Selected opportunities curated by {teamPerson.split(" ")[0]}.
                        </h2>
                    </div>

                    <button className="border border-yellow-500 text-yellow-400 px-5 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition">
                        View All Projects
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <ProjectCard img={img3} />
                    <ProjectCard img={img3} />
                    <ProjectCard img={img3} />
                </div>
            </div>
        </section>
    );
}