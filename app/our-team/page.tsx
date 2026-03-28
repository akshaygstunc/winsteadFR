
import TeamHero from "../components/teams/TeamHero";
import TeamStats from "../components/teams/TeamStats";
import TeamStrengths from "../components/teams/TeamStrengths";
import FeaturedProjects from "../components/teams/FeaturedProjects";
import TeamCTA from "../components/teams/TeamCTA";
import TeamAbout from "../components/teams/TeamAbout";

export default function OurTeam({ params }: { params: { slug: string } }) {
  const teamPerson = "SOPHIE WINSTEAD";

  return (
    <div className="bg-black text-white">
      <TeamHero teamPerson={teamPerson} />
      <TeamAbout teamPerson={teamPerson} />
      <TeamStrengths />
      <TeamStats />
      <FeaturedProjects teamPerson={teamPerson} />
      <TeamCTA teamPerson={teamPerson} />
    </div>
  );
}












