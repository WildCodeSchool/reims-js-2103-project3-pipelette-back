const db = require("../db-config");
const playlistRoutes = require("express").Router();

// TEST GET
playlistRoutes.get("/", (req, res) => {
  db.query("SELECT * from playlist", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

// GET CAPSULES OF THE CURRENT PLAYLIST
playlistRoutes.get("/:id/capsules", (req, res) => {
  db.query("SELECT * from capsule JOIN playlistCapsule ON capsule.id = playlistCapsule.capsule_id WHERE playlist_id = ?", [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

// TEST POST
playlistRoutes.post("/", (req, res) => {
  const { title } = req.body;
  const { user_id } = req.body;

  db.query(
    "INSERT INTO playlist(title, user_id) VALUES (?, ?)",
    [title, user_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("OOPS");
      } else {
        db.query(
          "SELECT * FROM playlist WHERE id = ?",
          [results.insertId],
          (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).send("OOPS");
            } else {
              res.status(201).json(results[0]);
            }
          }
        );
      }
    }
  );
});

// TEST DELETE
playlistRoutes.delete("/:id", (req, res) => {
  const playlistId = req.params.id;
  db.query("DELETE FROM playlist WHERE id = ?", [playlistId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting an playlist");
    } else {
      res.status(204).send("playlist deleted !");
    }
  });
});

module.exports = playlistRoutes;
