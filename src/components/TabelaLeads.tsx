// //
// import {
//   DndContext,
//   useDroppable,
//   useDraggable,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import { useSearchParams } from "react-router-dom";
// import { Lead } from "../utils/acessoLS";
// import { useState } from "react";

// export default function TabelaLeads({ leads }: { leads: Lead[] | null }) {
//   //   const leads: LeadLista[] = [
//   //     { nome: "Lucas Ramos Lamonier", id: 1234 },
//   //     { nome: "Gustavo Cândido de Oliveira Melo", id: 1221 },
//   //   ];

//   function onDragEnd(e: DragEndEvent) {
//     if (e.over && e.over.id === "droppable") {
//       setIsDropped(true);
//     }
//   }

//   const [isDropped, setIsDropped] = useState<boolean>(false);

//   return (
//     <div className="tabela-leads">
//       <DndContext onDragEnd={(e) => onDragEnd(e)}>
//         <div className="leads-linha">
//           <div className="leads-slot leads-header">Cliente Potencial</div>
//           <div className="leads-slot leads-header">
//             <h1>Dados Confirmados</h1>
//           </div>
//           <div className="leads-slot leads-header">
//             <h1>Análise do Lead</h1>
//           </div>
//         </div>
//         {/* {!leads
//           ? "não foi possível acessar os leads"
//           : leads.length === 0
//           ? "nenhum lead encontrado"
//           : leads.map((lead, i) => (
//               <LinhaLead
//                 key={"lead-" + i}
//                 idx={i}
//                 nome={lead.nome}
//                 id={lead.id}
//                 status={lead.status}
//               />
//             ))} */}
//         <LinhaLead
//           idx={0}
//           nome="Lucas"
//           id={1234}
//           status="Dados Confirmados"
//           onDragEnd={onDragEnd}
//         />
//       </DndContext>
//     </div>
//   );
// }

// function LinhaLead({
//   idx,
//   nome,
//   id,
//   status,
//   onDragEnd,
// }: {
//   idx: number;
//   nome: string;
//   id: number;
//   status: "Cliente Potencial" | "Dados Confirmados" | "Análise do Lead";
//   onDragEnd: (e: DragEndEvent) => void;
// }) {
//   const [params, setParams] = useSearchParams();

//   const nomeDisplay = nome.length < 36 ? nome : nome.slice(0, 36);

//   const statusDisponiveis = [
//     "Cliente Potencial",
//     "Dados Confirmados",
//     "Análise do Lead",
//   ];
//   const statusNum = statusDisponiveis.findIndex((s) => s === status);

//   const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
//   const style: React.CSSProperties = {
//     backgroundColor: isOver ? "green" : "fuchsia",
//   };

//   const [dropped, setIsDropped] = useState(null);

//   // id: "ihihih-0001",

//   return (
//     <>
//       {!dropped ? <Draggable /> : ""}
//       <div
//         style={style}
//         className={`leads-linha ${idx % 2 === 0 ? "leads-linha-conteudo" : ""}`}
//       >
//         {dropped ? <Draggable /> : ""}
//       </div>
//     </>
//   );
// }

// function Draggable() {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: "draggable",
//   });

//   const style = transform
//     ? {
//         transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//       }
//     : undefined;

//   return (
//     <div
//       className="leads-slot"
//       ref={setNodeRef}
//       style={style}
//       {...listeners}
//       {...attributes}
//     >
//       <button>ih IH</button>
//     </div>
//   );
// }
//
import {
  DndContext,
  useDroppable,
  useDraggable,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { useSearchParams } from "react-router-dom";
import { Lead } from "../utils/acessoLS";
import { useState } from "react";

export default function TabelaLeads({ leads }: { leads: Lead[] | null }) {
  const [coords, setCoords] = useState<number[] | undefined>(undefined);

  const draggableMarkup = <Draggable coords={coords}>ih ih</Draggable>;

  const handleDragEnd = (e: DragEndEvent) => {
    console.log(e);

    if (e.over && e.over.id === "droppable") {
      setCoords([e.delta.x, e.delta.y]);
    }
  };

  const handleDragStart = (e: DragStartEvent) => {
    console.log(e);
    https://github.com/clauderic/dnd-kit/blob/6f762a4d8d0ea047c9e9ba324448d4aca258c6a0/stories/1%20-%20Core/Draggable/1-Draggable.story.tsx#L55
  };

  return (
    <div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {!coords ? draggableMarkup : null}
        <Droppable>{coords ? draggableMarkup : "Drop here!"}</Droppable>
      </DndContext>
    </div>
  );
}

function Droppable({ children }: { children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
  const style: React.CSSProperties = {
    backgroundColor: isOver ? "green" : "yellowgreen",
    width: "500px",
    height: "500px",
  };
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

function Draggable({
  coords,
  children,
}: {
  coords: number[] | undefined;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : coords
      ? `translate3d(${coords[0]}px, ${coords[1]}px, 0)`
      : "",
    height: "25px",
    width: "150px",
    backgroundColor: "fuchsia",
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
