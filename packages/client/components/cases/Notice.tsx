export default function Notice({ type }: { type: "error" | "empty" }) {
  const emoji =
    type === "error" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-blue-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
    );

  const text =
    type === "error" ? (
      <p>Something went wrong! Please comeback later.</p>
    ) : (
      <p>
        There are no more undiagnosed cases for now. <br />
        <span className="text-blue-500">Thank you</span> for your contribuition.
      </p>
    );

  return (
    <div className="inline-flex flex-col items-center gap-4 md:mx-40 bg-white shadow rounded-lg p-6 mb-10">
      {emoji}
      {text}
    </div>
  );
}
