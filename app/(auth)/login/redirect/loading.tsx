import { LoadingSpinner } from "@/components/loading-spinner";

export default function Loading() {
  return (
    <div className="grid h-screen place-items-center">
      <LoadingSpinner className="h-24 w-24" />
    </div>
  );
}
