import { Product } from "@/utils/models";
import { GetServerSideProps } from "next";
import { useState } from "react";

export type ServerSidePropsProps = {
  products: Product[];
};

const ServerSideRender = (props: ServerSidePropsProps) => {
  const { products } = props;

  const [state, setState] = useState(0);

  return (
    <div>
      {/* Parte renderizada no navegador. */}
      <button onClick={() => setState(state + 1)}>click me</button>

      {/* Parte pré renderizada. */}
      <h1>Server Side Rendering!</h1>
      <h2>{state}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

// * Mesmo comportamento das funções anteriores. 
export const getServerSideProps: GetServerSideProps = async () => { 
  const res = await fetch("http://localhost:8000/products");
  const data = await res.json();

  return {
    props: {
      products: data,
    },
  };
};

export default ServerSideRender;
