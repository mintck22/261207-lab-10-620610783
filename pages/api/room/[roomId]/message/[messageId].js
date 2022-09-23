import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  if (req.method === "DELETE") {
    //read value from URL
    const roomId = req.query.roomId;
    const messageId = req.query.messageId;
    const rooms = readDB();

    const roomIdx = rooms.findIndex((x) => x.roomId === roomId);
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, messages: "Invalid room id" });

    const messageIdx = rooms[roomIdx].messages.findIndex(
      (x) => x.messageId === messageId
    );
    if (messageIdx === -1)
      return res
        .status(404)
        .json({ ok: false, messages: "Invalid message id" });

    rooms[roomIdx].messages.splice(messageIdx, 1);
    writeDB(rooms);

    return res.json({ ok: true });
  }
}
