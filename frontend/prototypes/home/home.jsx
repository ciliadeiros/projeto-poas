import { CabecalhoClaro } from "./CabecalhoClaro";
import { Carrosel } from "./Carrosel";
import { Element } from "./Element";
import { JogosEmAlta } from "./JogosEmAlta";
import { Search } from "./Search";
import "./style.css";
export const CatalogoClaro = () => {
return (
  <div className="catalogo-CLARO">
    <CabecalhoClaro />
    <div className="barra-de-pesquisa">
      <div className="frame-6">
        <div className="text-wrapper-8">PESQUISAR JOGO</div>
        <Search className="search-instance" />
      </div>
    </div>
    <Carrosel />
    <Element />
    <JogosEmAlta />
  </div>
  );
};
