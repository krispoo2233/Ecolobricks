import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACT, SOCIAL } from '../../data/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-32 md:py-40 section-dark">
      <div className="section-container">
        <SectionHeader
          label="Correspondence"
          title="Begin a collaboration"
          description="B2B supply, research partnership, or pilot project — we respond with the care of a bespoke atelier."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-panel-dark border border-bronze/20 rounded-3xl p-8 md:p-10 space-y-5"
            style={{ boxShadow: 'var(--shadow-soft)' }}
          >
            {(['name', 'email', 'company'] as const).map((field) => (
              <div key={field}>
                <label className="font-label text-beige/50 block mb-2">{field}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  required={field !== 'company'}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full bg-charcoal/50 border border-bronze/25 px-4 py-3 text-ivory font-body rounded-lg focus:outline-none focus:border-amber/50 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="font-label text-beige/50 block mb-2">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-charcoal/50 border border-bronze/25 px-4 py-3 text-ivory font-body resize-none rounded-lg focus:outline-none focus:border-amber/50"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              {sent ? 'Sent — we shall reply shortly' : 'Send correspondence'}
            </Button>
          </motion.form>

          <div className="space-y-6">
            <div className="border border-bronze/20 p-8 rounded-2xl" style={{ boxShadow: 'var(--shadow-subtle)' }}>
              <p className="font-label text-amber/70">Electronic mail</p>
              <a href={`mailto:${CONTACT.email}`} className="block mt-2 font-display text-xl text-ivory hover:text-amber transition-colors">
                {CONTACT.email}
              </a>
              <p className="font-label text-bronze mt-8">Telephone</p>
              <p className="mt-2 text-beige/70 font-body">{CONTACT.phone}</p>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 font-label text-amber border border-amber/30 px-4 py-2 hover:bg-amber/10 transition-colors rounded-xl"
              >
                WhatsApp
              </a>
            </div>
            <div className="h-64 border border-bronze/20 rounded-3xl overflow-hidden grayscale opacity-90 hover:grayscale-0 transition-all duration-700" style={{ boxShadow: 'var(--shadow-soft)' }}>
              <iframe
                title="Location"
                src={CONTACT.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
