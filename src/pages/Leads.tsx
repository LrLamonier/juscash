// import { FaPlus } from "react-icons/fa6";
// import logo from "../assets/logo-white.svg";
// import { useSearchParams } from "react-router-dom";

// export default function Leads() {
//   const [search, setSearch] = useSearchParams();

//   return (
//     <main>
//       <section className="secao-lead">
//         <div className="secao-container">
//           <div className="img-margem">
//             <img id="logo" src={logo} />
//           </div>

//           <div className="leads-container">
//             <button className="botao-secundario botao-secundario-direita">
//               <FaPlus /> Novo Lead
//             </button>

//             <div className="tabela-leads"></div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

import { FaPlus } from "react-icons/fa6";
import logo from "../assets/logo-white.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import acessoLS, { Lead } from "../utils/acessoLS";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getLeads, limparLeads } from "../store/slices/sliceLead";
import TabelaLeads from "../components/TabelaLeads";

export default function Leads() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const [leads, setLeads] = useState<Lead[] | null>([]);
  const usuarioLogado = useSelector((state: RootState) => state.logado);

  useEffect(() => {
    const usuario = usuarioLogado.usuario;
    if (!usuario) {
      return navigate("/");
    }

    const fetchLeadsUsuario = async () => {
      try {
        const resposta = await acessoLS({
          emailAutor: usuario.email,
        });

        if (!resposta) {
          setLeads(null);
        }

        dispatch(getLeads(resposta as Lead[]));

        console.log(resposta);
        return setLeads(resposta as Lead[]);
      } catch {
        setLeads(null);
      }
      setLeads(null);
    };

    fetchLeadsUsuario();

    return () => {
      dispatch(limparLeads());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <section className="secao-lead">
        <div className="secao-container">
          <div className="img-margem">
            <img id="logo" src={logo} />
          </div>

          <div className="leads-container">
            <button className="botao-secundario botao-secundario-direita">
              <FaPlus /> Novo Lead
            </button>

            <TabelaLeads leads={leads} />
          </div>
        </div>
      </section>
    </main>
  );
}
