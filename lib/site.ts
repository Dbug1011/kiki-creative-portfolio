// Site-wide constants. The cross-link to the tech portfolio comes from an env
// var so each deployment can point at the other one's real domain (see
// .env.example). Locally the two apps run on :3000 (tech) and :3001 (this).

export const site = {
  name: "Karis Ruth Jumawan",
  handle: "kiki",
  role: "Motion designer & video editor",
  location: "Tokyo, Japan",
  email: "blessedkarisj.22@gmail.com",
  linkedin: "https://www.linkedin.com/in/karis-ruth-jumawan/",
  techUrl: process.env.NEXT_PUBLIC_TECH_URL ?? "http://localhost:3000",
  showreel: { src: "/video/Kiki_Videography.mp4", title: "Showreel" },
  photography: { src: "/pdf/Jumawan-Photography-Portfolio.pdf", title: "Photography portfolio" },
};

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#stills", label: "Stills" },
  { href: "/#contact", label: "Contact" },
];
