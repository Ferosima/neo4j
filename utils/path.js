//array with name of node
export const getPath = (res) => {
  const segments = res.records[0].get(0).segments;
  const path = segments.map((el) => el.start.properties.name);
  path.push(segments[segments.length - 1].end.properties.name);
  return path;
};
