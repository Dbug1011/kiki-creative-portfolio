// Social proof from Kiki's own TikTok. Every number here was read from the
// public profile / post pages on the capture date below. Re-check and update
// them together (and bump `capturedAt`) rather than editing one in isolation.

export const tiktok = {
  handle: "kikiimnida",
  url: "https://www.tiktok.com/@kikiimnida",
  capturedAt: "7 Oct 2026",
  followers: 6994,
  likes: 759_800,
};

export type TopPost = {
  id: string;
  kind: "video" | "photo";
  title: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
};

/** Highest-reach posts with full engagement numbers. */
export const topPosts: TopPost[] = [
  {
    id: "7404862194023664917",
    kind: "video",
    title: "Balancing engineering and gym life",
    views: 510_000,
    likes: 68_600,
    comments: 301,
    shares: 4556,
  },
  {
    id: "7390964643646262545",
    kind: "photo",
    title: "Tips for incoming computer engineering students, part 1",
    views: 174_500,
    likes: 8270,
    comments: 165,
    shares: 510,
  },
  {
    id: "7392448064650333458",
    kind: "photo",
    title: "Tips for incoming computer engineering students, part 2",
    views: 150_100,
    likes: 8393,
    comments: 208,
    shares: 458,
  },
];

export type Reel = {
  id: string;
  title: string;
  tag: string;
  views: number;
};

/** Vertical videos shown as playable 9:16 cards (videos only: TikTok's
 *  player and oEmbed covers don't support photo carousels). */
export const reels: Reel[] = [
  { id: "7404862194023664917", title: "Balancing engineering and gym life", tag: "Lifestyle edit", views: 510_000 },
  { id: "7690517141665352980", title: "Struggling to manage your time? Watch this", tag: "Talking-head reel", views: 2970 },
  { id: "7690528481016335634", title: "Day 1 editing this style of reel", tag: "Editing experiment", views: 1792 },
  { id: "7681528525039471879", title: "A second monitor is a productivity game changer", tag: "Tech tip", views: 1527 },
  { id: "7690987443679481108", title: "Started computer engineering not knowing what to do", tag: "Advice reel", views: 1166 },
  { id: "7692453440743558420", title: "Job opportunities in computer engineering", tag: "Q&A reply", views: 1156 },
];

export const postUrl = (p: { id: string; kind?: "video" | "photo" }) =>
  `${tiktok.url}/${p.kind === "photo" ? "photo" : "video"}/${p.id}`;

/** (likes + comments + shares) / views */
export const engagementRate = (p: TopPost) => (p.likes + p.comments + p.shares) / p.views;

export const compact = (n: number) =>
  new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);

/**
 * Fresh cover image for a video via TikTok's public oEmbed endpoint. Cover
 * URLs are signed and expire, so they are fetched at build time and
 * refreshed with the page (see `revalidate` in app/page.tsx), never stored.
 */
export async function fetchCover(id: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(`${tiktok.url}/video/${id}`)}`,
      { next: { revalidate: 43_200 } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { thumbnail_url?: string };
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}
