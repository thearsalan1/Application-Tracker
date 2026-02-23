import connectDB from "./db";
import {Board,Column, JobApplications} from "./models"

export async function initialiseUserBoard(userId:string){
  const DEFAULT_COLUMN=[
    {
      name:"Wish List",order:0,
    },
    {
      name:"Applied",order:1,
    },
    {
      name:"Interviewing",order:2,
    },
    {
      name:"Offer",order:3,
    },
    {
      name:"Rejected",order:4,
    },
  ]
  try {
    await connectDB();

    const existingBoard=await Board.findOne({userId,name:"Job Hunt"});
    
    if(existingBoard){
      return existingBoard;
    }

    const board = await Board.create({
      name:"Job Hunt",
      userId,
      columns:[],
    })

    const column = await Promise.all(DEFAULT_COLUMN.map((col)=> Column.create({
      name:col.name,
      order:col.order,
      boardId:board._id,
      JobApplications:[]
    })))

    board.columns = column.map((col)=>col._id);
    await board.save()
  } catch (error) {
    throw error
  }
}