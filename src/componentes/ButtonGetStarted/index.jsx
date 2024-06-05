//  DEPENDENCIAS
import { Link } from 'react-router-dom';

const ButtonGetStarted = () => {

    return (
        <Link className='row text-decoration-none' to="/login">
            <div className='col-sm-12'>
                <div className='buttonGetStarted'>
                    <p>Get Started Now</p>
                </div>
            </div>
        </Link>
    )

}

export default ButtonGetStarted;
