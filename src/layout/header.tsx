    import { Link } from 'react-router'
    export default function Header(){
        return(
        <>
            <header className="bg-black py-1"> 
            <Link to="/home" className="flex items-center">
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS50bIftyNZiL-DAmEeUJjE49CFqSFs_ZbjTJKTeHHwT8qnxBo_QSl34Xa8cyHqicBuYKo&usqp=CAU"
                    alt="Logo"
                    className="w-10 h-10 m-6 object-cover rounded-lg hover:opacity-80 transition-opacity"
                />
            </Link>
            <Link
            to="/"
            
            >
            
            
            </Link>


            </header>
           
        </>

        )
    }