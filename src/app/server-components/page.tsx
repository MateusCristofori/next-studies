import { ListProducts } from "./list-products";

export const Page = () => {
  return (
    <div>
      {/* @ts-expect-error Server Component*/}
      <ListProducts />
    </div>
  );
};
