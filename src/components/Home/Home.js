import React from 'react';
import Header from '../Header/Header';
import './Home.css'
import ticketData from '../../fakeData/fakeData.json'
import { useState } from 'react';
import Package from '../Package/Package';
import { useEffect } from 'react';

const Home = () => {
    const [ticketPackage, setTicketPackage] = useState([]);
    useEffect(() => {
        setTicketPackage(ticketData);
    }, [])
    return (
        <div className="home-container">
            <div className='container'>
                <div className="row">
                    {
                        ticketPackage.map(ticket => <Package ticket={ticket}>{ticket.ticketId}</Package>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;