// Site-wide constants. The cross-link to the tech portfolio comes from an env
// var so each deployment can point at the other one's real domain (see
// .env.example). Locally the two apps run on :3000 (tech) and :3001 (this).

export const site = {
  name: "Karis Ruth Jumawan",
  handle: "kiki",
  role: "Social media manager & video editor",
  location: "Tokyo, Japan",
  email: "blessedkarisj.22@gmail.com",
  linkedin: "https://www.linkedin.com/in/karis-ruth-jumawan/",
  tiktok: "https://www.tiktok.com/@kikiimnida",
  techUrl: process.env.NEXT_PUBLIC_TECH_URL ?? "http://localhost:3000",
  showreel: { src: "/video/Kiki_Videography.mp4", title: "Showreel" },
  photography: { src: "/pdf/Jumawan-Photography-Portfolio.pdf", title: "Photography portfolio" },
};

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#social", label: "Social" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];
