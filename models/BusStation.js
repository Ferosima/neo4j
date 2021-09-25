export default {
  name: "string",
  connect: {
    type: "relationship",
    relationship: "TO",
    direction: "OUT",
    properties: {
      distance: "number",
    },
    target: "BusStation",
    cascade: "detach",
  },
};
