import KanbanBoard from "@/components/KanbanBoard";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";

export default async function Dashboard() {
  const session = await getSession();
  await connectDB();

  const board = await Board.findOne({
    userId: session?.user.id,
    name: "Job Hunt",
  }).populate({
    path: "columns",
  });

  console.log(board);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{board.name}</h1>
          <p className="text-gray-600">Track your job applications</p>
        </header>

        <KanbanBoard
          board={JSON.parse(JSON.stringify(board))}
          userId={session!.user.id}
        />
      </div>
    </div>
  );
}