import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();

  const result = [];
  for (const room of rooms) {
    result.push({
      roomTd: room.roomId,
      roomName: room.roomName,
    });
  }

  return res.json({ ok: true, rooms: result });
}
