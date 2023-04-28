import { GetStaticProps } from "next";
import { Product } from "../../utils/models";

export type IncrementalSideGenerationProps = {
  products: Product[];
};

const IncrementalSideGeneration = (props: IncrementalSideGenerationProps) => {
  const { products } = props;

  return (
    <div>
      <h1>Incremental side generation!</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

// * Essa função serve tanto para "Static side rendering" quanto para "incremental side generation"! O que muda é apenas o retorno da função.
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8000/products");
  const data = await res.json();

  return {
    props: {
      products: data,
    },
    // * A página continuará sendo estática, mas quando o tempo estipulado no atributo "revalidade" chegar no final, a função será executada novamente com novos dados.
    // * Isso serve para incrementar informações a aplicação e sem precisar gerar novas builds manualmente a fim de 're'executar a função. 
    revalidate: 10,
  };
};

export default IncrementalSideGeneration;
