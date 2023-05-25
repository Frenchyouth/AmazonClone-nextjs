import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { ToastContainer } from "react-toastify";

export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
      </Head>
{/* Header */}
<Header/>
<ToastContainer  />

<main className="max-w-screen-2Xl mx-auto">
  {/* Products */}
  <Banner />

  <ProductFeed products={products} />
 
</main>

    </div>
  );
}

  export async function getServerSideProps(context){
    const session = await getSession(context);
    const products = await fetch("https://fakestoreapi.com/products").then((res) => res.json());
    return {
      props: {
        products,
        session,
      },
    }
  }
