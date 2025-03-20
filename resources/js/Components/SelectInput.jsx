import { forwardRef, useImperativeHandle, useRef } from "react";

export default forwardRef(function SelectInput(
  { className = "", children, ...props },
  ref
) {
  const localRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  return (
    <select
      {...props}
      className={
        " mx-0  py-1" +
        (props.queryparams?.status ? " " : "!text-red-400 ") +
        "border-gray-300 h-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-900 dark:bg-gray-900 dark:text-gray-200 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 " +
        className
      }
      ref={localRef}
    >
      {children}
    </select>
  );
});
