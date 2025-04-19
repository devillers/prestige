import Link from "next/link";

const BreadCrumb = ({ items }) => {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex flex-wrap items-center gap-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:underline text-black/70">
                {item.label}
              </Link>
            ) : (
              <span className="text-black">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="mx-2 text-gray-400">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
