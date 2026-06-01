import React from 'react';
import { motion } from 'framer-motion';
import { LEADERSHIP_TEAM } from '../../data/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { TeamMemberCard } from './TeamMemberCard';

export const Team: React.FC = () => {
  const ceo = LEADERSHIP_TEAM.find((m) => m.featured)!;
  const rest = LEADERSHIP_TEAM.filter((m) => !m.featured);

  return (
    <section id="team" className="relative py-32 md:py-44 section-warm overflow-hidden -mt-16 z-20">
      <div className="absolute inset-0 opacity-20 blueprint-grid" aria-hidden />
      <div className="section-container relative z-10">
        <SectionHeader
          label="Leadership"
          title="The architects of our atelier"
          description="Three executives — product, market, and science — guiding EcoloBrick from laboratory craft to industrial permanence."
          align="center"
        />

        <div className="hidden lg:grid lg:grid-cols-3 gap-10 max-w-5xl mx-auto items-stretch">
          <TeamMemberCard member={rest[0]} index={0} />
          <TeamMemberCard member={ceo} index={1} featured />
          <TeamMemberCard member={rest[1]} index={2} />
        </div>

        <div className="lg:hidden grid gap-8 max-w-md mx-auto">
          <TeamMemberCard member={ceo} index={0} featured />
          {rest.map((m, i) => (
            <TeamMemberCard key={m.id} member={m} index={i + 1} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center font-body text-beige/45 text-sm max-w-md mx-auto"
        >
          Extended research fellowship with University of Annaba & CRTI
        </motion.p>
      </div>
    </section>
  );
};

export default Team;
