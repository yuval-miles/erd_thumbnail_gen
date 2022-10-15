import { useState } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import { useGenerateErd } from "./hooks/useGenerateErd";
import "reactflow/dist/style.css";
import { Erd } from "./hooks/interfaces";
import TableNode from "./Components/TableNode";

const nodeTypes = { tableNode: TableNode };

function App() {
  const [input, setInput] = useState("");
  const { nodes, edges, onEdgesChange, onNodesChange, genErd } =
    useGenerateErd();
  return (
    <div style={{ height: "100vh" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input"
      />
      <button
        id="submit"
        onClick={() => genErd(JSON.parse(input) as Erd)}
        className="submit"
      >
        submit
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default App;
