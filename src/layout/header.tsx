    import { Link } from 'react-router'
    export default function Header(){
        return(
        <>
         <header className=" -mt-2 flex items-center justify-between px-4"> 
                <Link 
                    to="/home" 
                    className="inline-block flex-shrink-0" 
                >
                    <img 
                        src="https://img.lovepik.com/png/20231120/orange-and-grey-nike-sneaker-illustration-clipart-vector-sticker_642174_wh860.png"
                        alt="Logo"
                        className="w-15 h-15 m-2 mt-3 object-cover rounded-lg hover:opacity-80 transition-opacity"
                    />
                </Link>
            <div>
                <button
                    className="ri-search-line text-black text-2xl hover:opacity-60 transition-opacity m-1"
                    >
                </button>

                <Link
                    to="/account"
                    className="ri-user-line text-black text-2xl hover:opacity-60 transition-opacity m-1"
                >
                </Link>
                    <Link
                    to="/cart"
                    className="ri-shopping-cart-2-line text-black text-2xl hover:opacity-60 transition-opacity m-1"      
                    >
                    </Link>
                
            </div>
        </header>
           
        </>

        )
    }