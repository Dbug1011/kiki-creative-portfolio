/**
 * Words rise out of a mask one after another, the same move used in the
 * kinetic-type work. Pure CSS (see `.word-rise` in globals.css), so the
 * headline animates from the first paint instead of waiting for hydration.
 * Each line is an array of words; `accent` lines get the gradient treatment.
 */
export default function KineticHeadline({
  lines,
}: {
  lines: { words: string[]; accent?: boolean }[];
}) {
  let index = 0;

  return (
    <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.words.map((word) => (
            <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span
                className={
                  line.accent
                    ? "word-rise inline-block bg-gradient-to-r from-purple-300 via-pink-300 to-fuchsia-400 bg-clip-text text-transparent"
                    : "word-rise inline-block"
                }
                style={{ animationDelay: `${0.1 + index++ * 0.08}s` }}
              >
                {word}
              </span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
