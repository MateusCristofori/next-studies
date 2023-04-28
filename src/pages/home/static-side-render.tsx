import { GetStaticProps } from "next";
import { Product } from "../../utils/models";

export type HomeProps = {
  products: Product[];
};

const Home = (props: HomeProps) => {
  const { products } = props;

  return (
    <div>
      <h1>Static side rendering!</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8000/products");
  const data = await res.json();

  return {
    props: {
      products: data,
    },
  };
};

export default Home;
