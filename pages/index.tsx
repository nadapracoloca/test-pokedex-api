// Bibliotecas Externas
import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

interface IPokemon {
  name: string;
  url: string;
}

interface IResponse {
  data: IPokemon[];
}

export const getServerSideProps: GetServerSideProps<IResponse> = async () => {
  try {
    const response = await axios.get(baseUrl);

    if (response.status === 200) {
      const pokemons: IPokemon[] = response.data.results;

      return {
        props: {
          data: pokemons,
        },
      };
    } else {
      return {
        props: {
          data: [] as IPokemon[],
        },
      };
    }
  } catch (error) {
    console.log(error);

    return {
      props: {
        data: [] as IPokemon[],
      },
    };
  }
};

const Home: NextPage<IResponse> = ({ data }) => {
  console.log({ data });
  return (
    <main>
      <h1>Lista de Pokemons</h1>

      <ul>
        {data.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
