import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ImgNotFound from '../assets/image-not-found-icon.png'

import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const Home = () => {
    // const [showData, setShowData] = useState([])
    useEffect(() => {


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
    console.log(data)
    return (
        <div className="container mx-auto">

            <div className="grid grid-cols-4 gap-5 mt-10">
                {
                    data?.map((item, idx) => <div key={idx}>
                        <div className="bg-[#718064] rounded-lg">
                            <div className="h-[350px] w-full overflow-hidden">
                                <img className="h-[350px] w-full hover:scale-125 duration-500 " src={item.show.image ? item.show.image.medium : ImgNotFound} alt='image not found' />
                            </div>
                            <div className="p-3">
                                <h2 className=" text-3xl font-semibold">{item.show.name}</h2>
                                <div className="flex justify-between">
                                    <p>{item.show.genres[0]}</p>
                                  {item.show.runtime?<p>{item.show.runtime} min</p>:''}  
                                    {item.show.rating.average ? <p className="flex gap-1 items-center"><FaStar /><span>{item.show.rating.average}</span></p> : ''}

                                </div>
                                <div className="flex justify-center mt-4">
                                    <Link to={`/showDetails/${item.show.id}`}><button className="border-2 border-slate-900 hover:bg-slate-900 hover:text-white duration-500 transition-all rounded-md p-2 text-[18px] font-semibold uppercase">show details</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Home;