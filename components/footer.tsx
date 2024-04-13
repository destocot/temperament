export const Footer = () => {
  return (
    <footer
      // className="absolute bottom-0 left-0 origin-top-left"
      // style={{ transform: "rotate(-90deg) translate(0, -100%)" }}
      className="h-[50px] border-t border-orange-500/50"
    >
      <div className="mx-auto h-full w-full max-w-7xl px-5">
        <div className="flex h-full items-center justify-end">
          <small className="text-base opacity-50">
            &copy; Khurram Ali -{" "}
            <span className="text-orange-500">Temperament</span>{" "}
            {new Date().getFullYear()}
          </small>
        </div>
      </div>
    </footer>
  );
};
