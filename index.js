import Neode from "neode";
import BusStation from "./models/BusStation.js";
import { getPath } from "./utils/path.js";

const instance = Neode.fromEnv().with({
  BusStation,
});

//get all name of bus stations
instance.all("BusStation").then((res) => {
  console.log(res.map((el) => el.get("name")));
});

//get short path
instance
  .cypher(
    "MATCH (Home:BusStation {name: 'Home'} ),(Work:BusStation {name: 'Work'}),p = shortestPath((Home)-[:TO*]-(Work))RETURN p"
  )
  .then((res) => {
    console.log(getPath(res));
  });

//get short path depend on distance
instance
  .cypher(
    "MATCH (from:BusStation {name: 'Home'} ),(to:BusStation {name: 'Work'}) , path = (from)-[:TO*]-(to) RETURN path AS shortestPath, reduce(distance = 0, r in relationships(path) | distance+r.distance) AS totalDistance ORDER BY totalDistance ASC LIMIT 1"
  )
  .then((res) => {
    console.log(getPath(res));
  });
