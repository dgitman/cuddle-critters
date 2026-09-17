export function PawIcon({ size = 34 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 36 36" aria-hidden="true">
      <ellipse cx="18" cy="24" rx="9" ry="7" fill="currentColor" transform="rotate(-4 18 24)" />
      <circle cx="8" cy="16" r="4" fill="currentColor" />
      <circle cx="14" cy="9" r="4" fill="currentColor" />
      <circle cx="23" cy="9" r="4" fill="currentColor" />
      <circle cx="29" cy="16" r="4" fill="currentColor" />
    </svg>
  );
}

export function BookIcon({ size = 28 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M4 5.5c4.2-.8 8 .2 12 3v18c-4-2.7-7.8-3.5-12-2.6V5.5Z" fill="currentColor" opacity=".16" />
      <path d="M28 5.5c-4.2-.8-8 .2-12 3v18c4-2.7 7.8-3.5 12-2.6V5.5Z" fill="currentColor" opacity=".3" />
      <path d="M4 5.5c4.2-.8 8 .2 12 3m12-3c-4.2-.8-8 .2-12 3m0 0v18m-12-21v18.4c4.2-.9 8-.1 12 2.6 4-2.7 7.8-3.5 12-2.6V5.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function BackIcon() {
  return (
    <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m14.5 5-7 7 7 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FootIcon() {
  return (
    <svg className="icon" width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M13.3 5.2c3.8-1.4 5.6 3.3 5 7.3-.6 4-2.5 6.5-5.4 6.4-3-.1-5.2-3.4-4.7-7.1.4-3 2.1-5.5 5.1-6.6ZM23 17.3c3-1.1 4.6 2.8 4.2 6-.5 3.3-2.1 5.3-4.5 5.1-2.5-.1-4.3-2.8-4-5.9.3-2.5 1.8-4.4 4.3-5.2Z" fill="currentColor" />
      <circle cx="20.6" cy="7.2" r="2" fill="currentColor" />
      <circle cx="25.4" cy="10.2" r="1.7" fill="currentColor" />
      <circle cx="29" cy="14.2" r="1.4" fill="currentColor" />
    </svg>
  );
}
