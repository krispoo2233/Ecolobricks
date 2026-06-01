import React from 'react';
import { motion } from 'framer-motion';
import type { LeadershipMember } from '../../data/siteContent';

interface TeamMemberCardProps {
  member: LeadershipMember;
  index: number;
  featured?: boolean;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  index,
  featured = false,
}) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className={`group relative ${featured ? 'lg:-mt-4' : ''}`}
  >
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-sm border bg-charcoal/80 ${
        featured ? 'border-amber/35' : 'border-bronze/20'
      }`}
    >
      {featured && (
        <span className="absolute top-4 right-4 z-20 font-label text-amber/90 border border-amber/30 px-3 py-1 bg-charcoal/80">
          Founder
        </span>
      )}

      <div className={`relative overflow-hidden ${featured ? 'aspect-[4/4]' : 'aspect-[4/4.2]'}`}>
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 transition-all duration-[1.2s] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
      </div>

      <div className="p-7 border-t border-bronze/15">
        <p className="font-label text-amber/70">{member.title}</p>
        <h3 className="mt-2 font-display text-xl font-semibold text-ivory">{member.name}</h3>
        <p className="mt-1 text-xs text-bronze font-body">{member.role}</p>
        <p className="mt-4 text-sm text-beige/55 leading-relaxed font-body line-clamp-3 group-hover:line-clamp-none transition-all">
          {member.bio}
        </p>
        <div className="mt-6 flex gap-3 pt-5 border-t border-bronze/10">
          <a
            href="#contact"
            className="font-label text-beige/40 hover:text-amber transition-colors"
          >
            Contact
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-beige/40 hover:text-amber transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </motion.div>
  </motion.article>
);

export default TeamMemberCard;
