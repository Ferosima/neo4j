import Neode from "neode";
import BusStation from "../models/BusStation.js";

const instance = Neode.fromEnv().with({
  BusStation,
});

instance.deleteAll("BusStation").then(console.log("Everyone has been deleted"));

Promise.all([
  instance.create("BusStation", { name: "Work" }),
  instance.create("BusStation", { name: "Home" }),
  instance.create("BusStation", { name: "BusStation 1" }),
  instance.create("BusStation", { name: "BusStation 2" }),
  instance.create("BusStation", { name: "BusStation 3" }),
])
  .then(([work, home, station_1, station_2, station_3]) => {
    home.relateTo(station_1, "connect", { distance: 1 });
    station_1.relateTo(station_2, "connect", { distance: 2 });
    station_2.relateTo(station_3, "connect", { distance: 1 });
    station_1.relateTo(station_3, "connect", { distance: 5 });
    station_3.relateTo(work, "connect", { distance: 1 });
  })
  .then(console.log("CREATED"));
