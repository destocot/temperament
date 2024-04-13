import { GetStartedBtn } from "@/components/get-started-btn";

export default function Home() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="max-w-prose space-y-5 text-center">
        <h1 className="text-6xl font-bold uppercase tracking-tight">
          t•em•per•ament
        </h1>
        <p className="opacity-60">
          noun (\tem-puh-ruh-muhnt): the part of your character that affects
          your moods and the way you behave. ex: &quot;I don&apos;t think
          he&apos;s got the right temperament to be a teacher.&quot;
        </p>
        <GetStartedBtn />
      </div>
    </div>
  );
}
