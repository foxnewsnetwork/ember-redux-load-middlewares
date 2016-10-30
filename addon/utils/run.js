import DAG from 'dag-map';
/**
interface dagNode = {
  name: String,
  before?: String | [String],
  after?: String | [String]
}

In our case, the blueprinted reducers, enhancers, and middlewares are all "dagNode"
*/

function addEdgesOf(type) {
  return (graph, dagNode) => {
    const { name, before, after } = dagNode;
    const runF = dagNode[type];

    graph.add(name, runF, before, after);
    return graph;
  };
}

export default function run(type) {
  const addEdges = addEdgesOf(type);

  return (dagNodes, callback) => {
    const graph = dagNodes.reduce(addEdges, new DAG());

    graph.topsort((name, f) => callback(name, f));
  };
}
