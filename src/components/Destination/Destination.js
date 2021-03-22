import React, { useState } from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData/fakeData.json'
import Map from '../Map/Map';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import './Destination.css'


const Destination = () => {
    const [destination, setDestination] = useState(true);
    const { id } = useParams();
    const selectedPackage = fakeData[id - 1];
    const [location, setLocation] = useState({
        from: '',
        to: ''
    })
    const handleTravelData = (e) => {
        let fieldValidation = true;
        if (fieldValidation) {
            const newLocation = { ...location };
            newLocation[e.target.name] = e.target.value;
            setLocation(newLocation);
        }
        e.preventDefault()
    }
    const handleSubmit = (e) => {
        setDestination(false);
        e.preventDefault();
    }
    return (
        <div style={{background: '#9B59B6', marginTop: '20px', borderRadius: '5px', padding: '25px'}} className="container destinationBG">
            <div className="row">
                <div className="col-md-4">
                    {destination &&
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label for="from">From</label>
                                <input onChange={handleTravelData} type="text" name='from' className="form-control" id="from" placeholder="Farmgate" />
                            </div>
                            <div className="mb-3">
                                <label for="to">To</label>
                                <input onChange={handleTravelData} type="text" name='to' className="form-control" id="to" placeholder="Dhanmondi" />
                            </div>
                            <div className="date">
                                <label for="start">Travel Date:</label>
                                <input className="form-control" type="date" id="start" name="trip-start"
                                    value="2021-03-22"
                                    min="2021-03-22" />
                            </div>
                            <Button type='submit' className="mt-2 mb-2 btn btn-primary">Search</Button>
                        </form>
                    }
                    {
                        !destination &&
                        <div className='mt-5'>
                            <div style={{ background: '#2980b9', padding: '20px', marginTop: '20px', color: 'white', borderRadius: '3px' }}>
                                <h2>{location.from}</h2>
                                <FontAwesomeIcon icon={faLevelDownAlt} />
                                <h2>{location.to}</h2>
                            </div>
                            <div className="pt-3">
                                <div className="row pt-2">
                                    <div className="col-md-4"><img className="img-fluid" src={selectedPackage.packageImg} alt="" /></div>
                                    <div className="col-md-4">{selectedPackage.ticketType}</div>
                                    <div className="col-md-4">${selectedPackage.price}</div>
                                </div>
                                <div className="row pt-2">
                                    <div className="col-md-4"><img className="img-fluid" src={selectedPackage.packageImg} alt="" /></div>
                                    <div className="col-md-4">{selectedPackage.ticketType}</div>
                                    <div className="col-md-4">${selectedPackage.price}</div>
                                </div>
                                <div className="row pt-2">
                                    <div className="col-md-4"><img className="img-fluid" src={selectedPackage.packageImg} alt="" /></div>
                                    <div className="col-md-4">{selectedPackage.ticketType}</div>
                                    <div className="col-md-4">${selectedPackage.price}</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="col-md-7 mt-3">
                    <Map></Map>
                </div>
            </div>
        </div>
    );
};

export default Destination;