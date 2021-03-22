import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './Package.css';

const Package = (props) => {
    const history = useHistory();
    const handleTicketPurchase = () =>{
        history.push('/destination');
    }
    const { ticketType, price, packageImg, ticketId } = props.ticket;
    return (
        <div className="col-md-3 card bgStyle">
            <img style={{padding: '20px'}} class="card-img-top img-fluid" src={packageImg} alt="Card Caption" />
            <div class="card-body">
                <h1 class="card-title">{ticketType}</h1>
                <h2 class="card-text">Price: ${price}</h2>
                <Link to={`/destination/${ticketId}`}><button onClick={handleTicketPurchase} class="btn card-btn">BUT NOW</button></Link>
            </div>
        </div>

    );
};

export default Package;