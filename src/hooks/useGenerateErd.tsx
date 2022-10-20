import { useEdgesState, useNodesState, Node } from "reactflow";
import { useCallback } from "react";
import { Erd, TablesGenerated, TablesSaved } from "./interfaces";

export const useGenerateErd = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const genErd = useCallback((data: Erd) => {
    const nodes: Node[] = [];
    if (isGeneratedTable(data.tables) && data.layout) {
      for (const table of data.layout) {
        nodes.push({
          id: table.id,
          position: { x: table.x, y: table.y },
          type: "tableNode",
          data: {
            columns: data.tables[table.id],
            tableName: table.id,
          },
        });
      }
    } else if (isSavedTable(data.tables)) {
      for (const table of data.tables) {
        nodes.push({
          id: table.name,
          position: { x: table.x, y: table.y },
          type: "tableNode",
          data: { columns: table.columns, tableName: table.name },
        });
      }
    }
    setNodes(nodes);
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

const isGeneratedTable = (
  tables: TablesGenerated | TablesSaved
): tables is TablesGenerated => {
  return true;
};

const isSavedTable = (
  tables: TablesGenerated | TablesSaved
): tables is TablesSaved => {
  return true;
};
