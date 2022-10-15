import { useEdgesState, useNodesState, Node } from "reactflow";
import { useCallback } from "react";
import { Erd } from "./interfaces";

export const useGenerateErd = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodesArr: Node[] = [];
  const genErd = useCallback((data: Erd) => {
    if (data?.layout)
      for (const table of data.layout) {
        if (table.x && table.y)
          nodesArr.push({
            id: table.id,
            position: { x: table.x, y: table.y },
            type: "tableNode",
            data: { columns: data.tables[table.id], tableName: table.id },
          });
      }
    setNodes(nodesArr);
    setEdges(data.edges);
  }, []);
  return {
    genErd,
    nodes,
    edges,
    onEdgesChange,
    onNodesChange,
  };
};
