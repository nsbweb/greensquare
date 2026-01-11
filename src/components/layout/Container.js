export default function Container({ children, className = "", paddingClassName = "px-4 sm:px-6" }) {
  return (
    <div className={`mx-auto w-full  max-w-[88rem] ${paddingClassName} ${className}`}>
      {children}
    </div>
  );
}
