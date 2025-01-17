import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { logout } from "@/app/slices/authSlice"



const Header = () => {
    const dispatch=useDispatch()

    const handleLogout=async ()=>{
        dispatch(logout())
    }
    return (
        <div className="flex items-center justify-between px-4 ">
            <div className="">
                <Link to="/">
                    <img src="/logo.png" alt="Logo" className="w-12 h-12" />
                </Link>
            </div>
            <div className="">
                <Button variant={"default"} onClick={handleLogout}>
                    LogOut
                </Button>
            </div>
            
        </div>
        
    )
}

export default Header
