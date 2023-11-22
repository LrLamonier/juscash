import { useSearchParams } from "react-router-dom";
import FormLogin from "../components/FormLogin";
import FormSignUp from "../components/FormSignUp";

export default function Home() {
  const [search, setSearch] = useSearchParams();

  return (
    <main>
      {search.get("log") ? (
        <FormLogin setSearch={setSearch} />
      ) : (
        <FormSignUp setSearch={setSearch} />
      )}
    </main>
  );
}
