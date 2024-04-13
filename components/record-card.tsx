import { JournalRecord } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type RecordCardProps = {
  record: JournalRecord;
};

export const RecordCard = ({ record }: RecordCardProps) => {
  const date = new Date(record.createdAt).toDateString();

  return (
    <Card className="cursor-pointer transition hover:border-gray-700">
      <CardHeader>
        <CardTitle className="line-clamp-1">{record.content}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      {/* <CardContent>
        <p>summary</p>
      </CardContent>
      <CardFooter>
        <p>mood</p>
      </CardFooter> */}
    </Card>
  );
};
