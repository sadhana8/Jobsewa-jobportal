// app/api/job/search/route.ts
import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../middlewares/isAuth";
import { Job } from "../../../../../models/Job";


export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const query = searchParams.get("query"); // keyword for search

    const user = await CheckAuth(token);

    if (!user) {
      return NextResponse.json({ message: "Please Login" }, { status: 401 });
    }

    const jobs = await Job.find({
      title: { $regex: query, $options: "i" }, // case-insensitive match
    }).limit(20); // limit to 20 results

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
