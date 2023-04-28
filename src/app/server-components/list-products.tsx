// * Representação de um "Server Component". Com o server components, temos um cache a "nível de componente" ao invés de "nivel de página".
import { Product } from "@/utils/models";

// * OBS: Esse componente não apenas se torna reutilizável, mas também, fica em cache. Ou seja, se utilizarmos este componente em outro lugar, o "fetch" não será feito novamente. Isso representa um ganho de performance!
// * Mas existe um porém. Se esse produtos precisarem serem revalidados, ou seja, existe um certo dinamismo nos dados, podemos passar um objeto para a função "fetch()".
// * Essa função "fetch()" irá receber um objeto com a chave "next". Essa chave também representa um objeto e possui o "revalidade" como um dos seus atributos. Para realizar a revalidação, basta passar um tempo (em segundos) para esse atributo.
async function getProducts(): Promise<Product[]> {
  // * Para revalidarmos esse componente, basta passar um valor para o atributo "revalidade" que está dentro do objeto "next". Após o tempo, o componente será revalidado, novas informações serão enviadas para o browser e serão cacheadas!
  const res = await fetch("http://localhost:8000/products", {
    next: { revalidate: 10 },
  });
  // * const res = await fetch("http://localhost:8000/products"); -> Static side rendering!
  // * const res = await fetch("http://localhost:8000/products", { cache: no-store }); -> Server side rendering! As requisições a API serão constantemente chamadas!
  const data = await res.json();
  return data;
}

// * Com server components, não utilizar as funções para os padrões de páginas estáticas, incrementais ou renderizadas no servidor.
// * Vamos usar apenas uma função normal e, no componente, iremos chamá-la. Porém, o componente precisará ser assíncrono!
export const ListProducts = async () => {
  const products = await getProducts();

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};
