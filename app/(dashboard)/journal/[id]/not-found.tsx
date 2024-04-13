import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full flex flex-col justify-center items-center">
      <h1 className="text-8xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-gray-500 px-2 text-sm rounded rotate-12 absolute">
        Journal Record Not Found
      </div>
      <button className="mt-5">
        <div className="relative inline-block text-sm font-medium text-gray-500 group active:text-gray-700 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-gray-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link href="/journal">Return to Journal</Link>
          </span>
        </div>
      </button>
    </main>
  );
}
