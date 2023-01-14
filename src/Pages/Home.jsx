import React, { useEffect, useMemo, useState } from "react";
import { Container } from "@mui/system";
import Navbar from "../Componentes/Navbar";
import PokemonCard from "../Componentes/PokemonCard";
import { Box, Grid, Skeleton } from "@mui/material";
import axios from "axios";
import { Skeletons } from "../Componentes/skeleton";

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true)
    const [busca, setBusca] = useState("")
    // 2° state de busca (busca)
    // 3° state lista filtrada 

    useEffect (() => { 
        console.log("TESTE")
        getPokemons();},[]);
    
    const getPokemons = () => {
        var endpoints = []
        for (var i = 1; i < 50; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        setLoading(true)
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {setPokemons(res); setLoading(false)});

    }
       const pokemonsFiltrados = useMemo(()=>{
        const lowerBusca = busca.toLowerCase();
        return pokemons.filter((pokemon) => 
        pokemon.data.name.toLowerCase().includes(lowerBusca)
        ); },[busca, pokemons]);


    return (
    <div>
        
        <Navbar pokemonFilter={setBusca} />;
        <Container maxWidth="false">
       
            <Grid container spacing={3}>
                {loading ? <Skeletons/> : (
                pokemonsFiltrados.map((pokemon) => ( 
                <Grid item xs={12} sm={6} md={5} lg={2} key={pokemon.data.name}>
                    <PokemonCard name={pokemon.data.name} image= {pokemon.data.sprites.front_default} types={pokemon.data.types} />
                </Grid>
                ))
                )};
            </Grid>
        </Container>
    </div>
);
}