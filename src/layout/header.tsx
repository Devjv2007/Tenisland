    import { Link } from 'react-router'
    export default function Header(){
        return(
        <>
         <header className="bg-black -mt-2 flex items-center justify-between px-4"> 
                <Link 
                    to="/home" 
                    className="inline-block flex-shrink-0" 
                >
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS50bIftyNZiL-DAmEeUJjE49CFqSFs_ZbjTJKTeHHwT8qnxBo_QSl34Xa8cyHqicBuYKo&usqp=CAU"
                        alt="Logo"
                        className="w-15 h-15 m-2 object-cover rounded-lg hover:opacity-80 transition-opacity"
                    />
                </Link>
            <div>
                <button
                    className="ri-search-line text-white text-2xl hover:opacity-60 transition-opacity m-1"
                    >
                </button>

                <Link
                    to="/account"
                    className="ri-user-line text-white text-2xl hover:opacity-60 transition-opacity m-1"
                >
                </Link>
                    <Link
                    to="/cart"
                    className="ri-shopping-cart-2-line text-white text-2xl hover:opacity-60 transition-opacity m-1"      
                    >
                    </Link>
                
            </div>
        </header>
           
        </>

        )
    }