import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ImgNotFound from '../assets/image-not-found-icon.png'


const Home = () => {
    const [showData, setShowData] = useState([])
    useEffect(() => {
        // fetch('https://api.tvmaze.com/search/shows?q=all')
        // .then(res => res.json())
        // .then(data => setShowData(data))

        async () => {
            const res = await axios.get('https://api.tvmaze.com/search/shows?q=all')
            const shows = res.data
            setShowData(shows)
        }


    }, [])
    const { data, isPending } = useQuery({
        queryKey: ['tvshows'],
        queryFn: async () => {
            const res = await axios.get('https://api.tvmaze.com/search/shows?q=all')
            return res.data
        }
    })
    if (isPending) {
        return
    }
    console.log(data[4])
    return (
        <div className="container mx-auto">
            <Navbar></Navbar>

            <div className="grid grid-cols-4 gap-5 mt-10">
                {
                    data?.map((item, idx) => <div key={idx}>
                        <div className="bg-[#718064] rounded-lg">
                            <img className="h-[350px] w-full" src={item.show.image ? item.show.image.medium : ImgNotFound} alt='image not found' />
                            <h2>{item.show.name}</h2>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Home;