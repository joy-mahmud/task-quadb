import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="bg-[#0E1D33] p-3 container mx-auto flex justify-between">
            <h2 className="text-center text-4xl font-bold text-white">Tv shows</h2>
            <div className="text-white">
                <ul className="flex text-xl font-semibold gap-5">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/myBookings'}>My bookings</Link></li>
                </ul>
            </div>
            <div></div>
        </div>
    );
};

export default Navbar;