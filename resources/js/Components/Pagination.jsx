import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
  return (
    <nav className="text-center m-2 p-1 text-gray-400">
      {links.map((link) => (
        <Link
          href={link.url}
          className={
            "px-2 mx-2 py-1 inline-block text-xs rounded-md " +
            (!link.url
              ? "!text-gray-700 cursor-not-allowed hover:bg-transparent "
              : "  ") +
            (link.active ? "!text-white bg-gray-900" : "hover:bg-gray-900  ")
          }
          dangerouslySetInnerHTML={{
            __html: link.label.includes("&laquo;")
              ? link.label.split(" ")[0]
              : link.label.includes("&raquo;")
              ? link.label.split(" ")[1]
              : link.label,
          }}
        ></Link>
      ))}
    </nav>
  );
};

export default Pagination;
