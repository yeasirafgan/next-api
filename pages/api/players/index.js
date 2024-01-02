import { Players } from "@/data/players";

export default function handler(req,res){
  if(req.method === "GET") {
    res.status(200).json(Players);
  }
  if(req.method === "POST") {
    const playerObj = req.body;
    Players.push(playerObj);
    res.status(200).json(playerObj);
  }
}