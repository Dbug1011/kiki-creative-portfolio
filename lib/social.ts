// Social proof from Kiki's own TikTok. Every number here was read from the
// public profile / post pages on the capture date below (258 posts checked). Re-check and update
// them together (and bump `capturedAt`) rather than editing one in isolation.

export const tiktok = {
  handle: "kikiimnida",
  url: "https://www.tiktok.com/@kikiimnida",
  capturedAt: "7 Oct 2026",
  /** Confirmed by Kiki: no post has ever been promoted or boosted. */
  organic: true,
  followers: 6994,
  likes: 759_800,
};

export type Post = {
  id: string;
  kind: "video" | "photo";
  title: string;
  /** Short category label shown on reel cards. */
  tag: string;
  posted: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  /** Not exposed for photo carousels. */
  saves?: number;
};

/**
 * Every post over 100K views (all 258 posts on the profile were checked),
 * highest first.
 */
export const topPosts: Post[] = [
  { id: "7401103758760955154", kind: "video", title: "People say I'm too young for my year level", tag: "Student life", posted: "2024-08-09", views: 1_100_000, likes: 62_800, comments: 1272, shares: 2653, saves: 1716 },
  { id: "7510452000157388040", kind: "video", title: "POV: you're a 3rd-year computer engineering student", tag: "Trend template", posted: "2025-05-31", views: 566_800, likes: 44_900, comments: 271, shares: 2996, saves: 4439 },
  { id: "7404862194023664917", kind: "video", title: "Balancing engineering and gym life", tag: "Lifestyle edit", posted: "2024-08-19", views: 510_000, likes: 68_600, comments: 301, shares: 4556, saves: 4265 },
  { id: "7411852823303851265", kind: "video", title: "My version: big bike trend", tag: "Trend edit", posted: "2024-09-07", views: 446_100, likes: 60_000, comments: 672, shares: 2382, saves: 5564 },
  { id: "7424089713792896273", kind: "video", title: "Is engineering a red flag?", tag: "Comedy skit", posted: "2024-10-10", views: 308_300, likes: 34_000, comments: 216, shares: 2272, saves: 2664 },
  { id: "7642213041706241288", kind: "video", title: "Started Computer Engineering without knowing how to code", tag: "Story reel", posted: "2026-05-21", views: 214_800, likes: 17_000, comments: 123, shares: 386, saves: 796 },
  { id: "7390964643646262545", kind: "photo", title: "Tips for incoming computer engineering students, part 1", tag: "Carousel", posted: "2024-07-13", views: 174_500, likes: 8270, comments: 165, shares: 510 },
  { id: "7392448064650333458", kind: "photo", title: "Tips for incoming computer engineering students, part 2", tag: "Carousel", posted: "2024-07-17", views: 150_100, likes: 8393, comments: 208, shares: 458 },
  { id: "7660830813164014855", kind: "video", title: "My calculator throughout college", tag: "Product review", posted: "2026-07-10", views: 112_100, likes: 707, comments: 26, shares: 154, saves: 296 },
  { id: "7508373781413465362", kind: "video", title: "A wonderful way to end the semester", tag: "Project recap", posted: "2025-05-25", views: 108_200, likes: 9507, comments: 60, shares: 1009, saves: 1221 },
];

/** Videos shown as playable 9:16 cards. Photo carousels are left out:
 *  TikTok's player and oEmbed covers don't support them. */
export const reels = topPosts.filter((p) => p.kind === "video");

export const totalTopViews = topPosts.reduce((n, p) => n + p.views, 0);

export const postUrl = (p: { id: string; kind?: "video" | "photo" }) =>
  `${tiktok.url}/${p.kind === "photo" ? "photo" : "video"}/${p.id}`;

/** (likes + comments + shares) / views */
export const engagementRate = (p: Post) => (p.likes + p.comments + p.shares) / p.views;

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
