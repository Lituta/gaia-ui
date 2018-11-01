export const default_query = 'eval_graph_query';
export const default_ep = 'ta2_run1';
export const server_base = 'http://gaiadev01.isi.edu:5001/';
// export const server_base = 'http://localhost:5001/';

export function getClusterVizUrl(prototype) {
  const temp = prototype.split('/');
  const type = temp[4];
  const hash = temp[5].replace('-prototype', '');
  // return `http://localhost:5005/cluster/${type}/${hash}-cluster`;
  return `http://gaiadev01.isi.edu:5005/cluster/${type}/${hash}-cluster`;
}
