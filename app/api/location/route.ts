import client from "@/db-setup";
import { NextRequest, NextResponse } from "next/server";


let connected = false

export async function POST() {
    console.log('its comming here')
    if(connected === false){
        await client.connect()
        connected = true 
    }    
  try {
    const query = "INSERT INTO posts(content) VALUES($1)";
    const values = ["asdfds", "asdfadsf"];
    const result = await client.query(query, values);
    console.log("ttt", result);
  } catch (error) {
    console.log(error);
  }
  console.log('its getting there')
  return NextResponse.json({
    type: "error",
    message: "asdf",
    status: 403,
  })
}
