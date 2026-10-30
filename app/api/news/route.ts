import { NextResponse } from "next/server";
//import news from "@/json-data/news.json";
import { useSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = useSupabase()
  const {data,error} = await supabase.from('news').select('*')

if(error){
  return NextResponse.json({error:error.message},{status:500})
}

  return NextResponse.json(data);
}
