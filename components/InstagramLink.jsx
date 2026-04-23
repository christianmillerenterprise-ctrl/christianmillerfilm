const INSTAGRAM_URL = "https://www.instagram.com/millerchristianfilm";

/**
 * @param {{ className?: string; iconClassName?: string }} props
 */
export default function InstagramLink({ className = "", iconClassName = "h-5 w-5" }) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex text-ink transition-colors hover:text-gold ${className}`}
      aria-label="Instagram — @millerchristianfilm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClassName}
        aria-hidden
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}
