import { Canvas } from "@react-three/fiber"

import HomeScene from "../components/HomeScene"
import { useEffect, useRef } from "react"
import { dropDownAnimation } from "../utils/animations";


const Home = () => {

    const selectedRef = useRef();

    //import on-scroll animation

    // useEffect(() => {
        
    // }, []);

    return (
        <section ref = {selectedRef} className="bg-black">
            <section className='background relative h-screen w-screen '>
                <div className="absolute flex flex-col items-start justify-start p-20 top-20 left-0 right-0 z-10">
                    <h1 className="welcome-box text-9xl font-bold z-10">
                        Welcome to
                    </h1>
                    <h1 className="welcome-box text-9xl font-bold z-10">
                        F1Xotics
                    </h1>
                </div>
                <Canvas className="w-screen h-screen bg-transparent">
                    <HomeScene />
                </Canvas>
            </section>

            <section className="relative p-10 h-full w-width"/>
                <div className="flex flex-col justify-top items-start w-screen p-2">
                    <h1 className="w-1/2 text-8xl px-10 py-4 font-bold border-b-2 border-b-white">
                        About us
                    </h1>
                </div> 

                <div className="absolute flex flex-row justify-between gap-5 top-96 mt-94 py-9 pl-10">

                    <h2 className="text-justify w-1/2 p-4 mt-70">
                    Welcome to F1xotic, the ultimate destination for Formula 1 enthusiasts and collectors. Whether you’re looking for a legendary race-winning machine, a modern speedster, or a historic classic, we specialize in connecting buyers and sellers of F1 cars from all eras.

                    Our platform offers a category-based selection, allowing you to browse cars by team, era, championship history, or performance specs. Looking to sell? You can list your own F1 car with us and connect with passionate buyers who truly appreciate these engineering masterpieces.

                    At F1xotic, we bring together collectors, teams, and motorsport fans to keep the spirit of racing alive. Explore our collection, post your car for sale, and join the world’s most exclusive community of F1 car owners.

                    Own a piece of racing history today!
                    </h2>
                
                    <img className="h-full w-1/3" src='./img/F1CarImages/Ferrari1960.jpg' alt="Ferrari 1960 F1 car" />
                </div>
            <section />
        </section>
  )
}

export default Home