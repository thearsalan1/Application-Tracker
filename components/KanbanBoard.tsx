"use client"

import { Board, Column } from '@/lib/models/models.types';
import { Award, Calendar, CheckCircle2, Mic, MoreHorizontal, MoreVertical, Trash2, XCircle } from 'lucide-react';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import CreateJobApplicationDialog from './CreateJobApplicationDialog';
import board from '@/lib/models/board';

interface kanbanBoardProps{
  board:Board;
  userId:string
}

interface ColConfig{
  color:string; icon:React.ReactNode
}

const COLUMN_CONFIG: Array<{color:string;icon:React.ReactNode}>=[
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2
     className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
];

function DropableColumn({
  column,
  config,
  boardId,
}: {
  column: Column;
  config: ColConfig;
  boardId: string;
}) {
  return (
    <Card className="min-w-[250px] flex-shrink-0">
      <CardHeader className={`${config.color} text-white`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle>{column.name}</CardTitle>
          </div>

          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
      <Trash2 className="h-4 w-4" />
      Delete column
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className='space-y-2 pt-4 bg-gray-50/50 min-h-100 rounded-b-lg'>

      <CreateJobApplicationDialog columnId={column._id} boardId={boardId}></CreateJobApplicationDialog>
      </CardContent>
    </Card>
  );
}

const KanbanBoard = ({board,userId}:kanbanBoardProps) => {
  const columns = board.columns;
  console.log(columns[0].jobApplications);
  
  return (
    <>
      <div className="flex gap-4 overflow-x-auto p-4">
  {columns.map((col, key) => {
    const config = COLUMN_CONFIG[key] || {
      color: "bg-cyan-500",
      icon: <Calendar className="h-4 w-4" />,
    };
    return (
      <DropableColumn
        key={key}
        column={col}
        config={config}
        boardId={board._id}
      />
    );
  })}
</div>
    </>
  )
}

export default KanbanBoard