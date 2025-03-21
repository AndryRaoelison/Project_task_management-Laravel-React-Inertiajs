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
    <th
      onClick={
        filterbool
          ? () => {
              sortChanged(name);
            }
          : null
      }
      className={
        "px-3 py-0 " + (filterbool && "cursor-pointer ") + "gap-1 " + className
      }
    >
      <div className="flex items-center">
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
