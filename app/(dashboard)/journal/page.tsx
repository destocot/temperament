import { NewRecordCard } from "@/components/new-record-card";
import { RecordList } from "@/components/record-list";
import { Question } from "@/components/question";

export const dynamic = "force-dynamic";

export default function JournalPage() {
  return (
    <main className="max-w-7xl grow space-y-5 p-5">
      <h2 className="text-3xl font-bold">Journal</h2>
      <Question />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <NewRecordCard />
        <RecordList />
      </div>
    </main>
  );
}
