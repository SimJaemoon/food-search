import Link from 'next/link';

export default function TextButton({
  textContent,
  url,
}: {
  textContent: string;
  url: string;
}) {
  return (
    <button className="h-full">
      <Link href={url} className={`h-full`}>
        {textContent}
      </Link>
    </button>
  );
}
