import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function removeTags(inputString) {
    return inputString.replace(/<[^>]*>/g, '');
}

const ShowDetails = () => {
    const id = useParams()
    console.log(id)
    const { data, isPending } = useQuery({
        queryKey: ['tvshows'],
        queryFn: async () => {
            const res = await axios.get('https://api.tvmaze.com/search/shows?q=all')
            const show = res.data.filter(item => {
                return item.show.id == id.id
            })
            return show
        }
    })
    if (isPending) {
        return
    }
    const description = removeTags(data[0].show.summary);
    console.log(data)
    const handleBook = (id)=>{
        const day =data[0].show.schedule.days[0]
        const time = data[0].show.schedule.time
        const newBooking = {
            id:id,
            name:data[0].show.name,
            network:data[0].show.network?.name,
            time:{day,time}
            
        }
        const bookedItemsStr = localStorage.getItem('mybooking')
        if(bookedItemsStr){
            const bookedItems = JSON.parse(bookedItemsStr)
            const newBookings = [...bookedItems,newBooking]
            const newBookingStr = JSON.stringify(newBookings)
            localStorage.setItem('mybooking',newBookingStr)
            toast("You booked this ticket!");
        }else{
            const newBookingArray =[]
            const booking =[...newBookingArray,newBooking]
            const newBookingStr = JSON.stringify(booking)
            localStorage.setItem('mybooking',newBookingStr)
        }
        console.log(id)
       
    }
    return (
        <div className="container mx-auto mt-5">
            <div className="w-full bg-slate-300 flex">
                <img className='w-[600px] h-[500px]' src={data[0].show.image.original} alt="" />
                <div className="p-5 flex-1">
                <h2 className=" text-5xl font-bold mb-2"> {data[0].show.name}</h2> 
                    <p className="mb-5">{description}</p>
                   {data[0].show.network?<h2><span className="text-xl font-semibold">Network: </span>{data[0].show.network.name}</h2>:''} 
                    <h2><span className="text-xl font-semibold">premiered: </span>{data[0].show.premiered}</h2>
                    <h2><span className="text-xl font-semibold">schedule: </span>{data[0].show.schedule.days[0]} {data[0].show.schedule.time}</h2>
                    <h2><span className="text-xl font-semibold">language: </span>{data[0].show.language}</h2>
                    <h2><span className="text-xl font-semibold">status: </span>{data[0].show.status}</h2>
                    <h2><span className="text-xl font-semibold">Duration: </span>{data[0].show.runtime} min</h2>
                    <h2><span className="text-xl font-semibold">Rating: </span>{data[0].show.rating.average}</h2>
                    <button onClick={()=>handleBook(data[0].show.id)} className=" mt-3 border-2 border-slate-900 hover:bg-slate-900 hover:text-white duration-500 transition-all rounded-md p-2 text-[18px] font-semibold uppercase">Book ticket</button>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    );
};

export default ShowDetails;