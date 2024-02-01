import { useState } from "react";

import { MdDeleteForever } from "react-icons/md";
const MyBookings = () => {
    const [bookings,setbookings]=useState(localStorage.getItem('mybooking')?JSON.parse(localStorage.getItem('mybooking')):[])
//   deleting the bookings from localStorage and showing remaining in ui
    const handleDelete =(id)=>{
    console.log(id)
    const previousBookings = JSON.parse(localStorage.getItem('mybooking'))
    const remainingItems = previousBookings.filter(item=>{
       return item.id!=id
    })
    const newBookingStr = JSON.stringify(remainingItems)
    localStorage.setItem('mybooking',newBookingStr)
    setbookings(remainingItems)
   }
   console.log(bookings)
    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold my-5 text-center">my booked Tickets</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Network</th>
                            <th>Show Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings.map((item,idx)=><tr key={idx} className="bg-base-200">
                            <th>{idx+1}</th>
                            <td>{item.name}</td>
                            <td>{item.network}</td>
                            {item.time.day?<td>{item.time.day} {item.time.time}</td>:<td></td>}
                            <td><button onClick={()=>handleDelete(item.id)}><MdDeleteForever className="text-2xl"/></button></td>
                        </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookings;