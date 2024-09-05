import Link from 'next/link';

export default function TextButton({
  textContent,
  url,
  replace,
}: {
  textContent: string;
  url: string | { pathName: string; query: { sortType: string } };
  replace?: boolean;
}) {
  return (
    <button className="h-full">
      <Link href={url} className={`h-full`} replace={replace}>
        {textContent}
      </Link>
    </button>
  );
}
