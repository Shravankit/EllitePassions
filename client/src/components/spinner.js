import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({path = 'login'}) => {

    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const intervel = setInterval(() => {
            setCount((prevValue) => {
                if(prevValue === 0)
                {
                    clearInterval(intervel);
                    navigate(`/${path}`,
                    {
                        state: location.pathname,
                    });
                    return prevValue
                }
                return prevValue - 1;
            })
        }, 1000);
        return () => clearInterval(intervel);
    }, [count, navigate, path, location]);

    return(
        <>
             <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:'100vh'}}>
        <h1 className='text-center'>redirecting to you in {count} seconds</h1>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        </>
    )
}

export default Spinner;