const TableHeading = ({
  name,
  sortChanged,
  sort_direction,
  children,
  className,
  filterbool,
  ...props
}) => {
  sort_direction ??= null;
  filterbool ??= false;
  sortChanged ??= null;
  return (
    <th className={"px-3 py-0 " + +"gap-1 " + className}>
      <div
        className={
          "flex items-center w-fit " + (filterbool && "cursor-pointer ")
        }
        onClick={
          filterbool
            ? () => {
                sortChanged(name);
              }
            : null
        }
      >
        {children}
        {filterbool && (
          <div>
            <span className={sort_direction === "asc" ? "text-white " : " "}>
              ↑
            </span>
            <span
              className={
                "-mt-1 " + (sort_direction === "desc" ? " text-white " : " ")
              }
            >
              ↓
            </span>
          </div>
        )}
      </div>
    </th>
  );
};

export default TableHeading;
