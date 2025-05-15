import React from "react"
import {Link} from "react-router-dom";


const ListingCard = ({location}) => {
    // const {destinationName, location, continent, language, nationality,images, description,flightCost,accommodationCost,
    //     mealCost,visaCost,dailyCost, currencyCode, transportationModes,transportationCost, visaIsRequired,
    //     visaRequirements, timeZone, bestTimeToVisit, bestPlacesToVisit} = trip
    
    // alert(JSON.stringify(location));
    return (
        <div className="listing-card" key={location._id}>
            <figure className="listing-card-banner" style={{height:200}}> 
                <img src={ "http://localhost:2002/uploads/"+location.ppic} alt={location.email} loading="lazy"/>
            </figure>
            <div className="listing-body">
                <h3 className="listing-card-title">{location.firstname}  {location.lastname}</h3>
                <p className="listing-card-text">{location.category}</p>
            </div>

            <div className="listing-price">
                <div className="listing-wrapper">
                    <p className="listing-reviews">(25 reviews)</p>
                    <div className="listing-rating">
                        {/* <FontAwesomeIcon className="rating-icon" icon={faStar}/>
                        <FontAwesomeIcon className="rating-icon" icon={faStar}/>
                        <FontAwesomeIcon className="rating-icon" icon={faStar}/>
                        <FontAwesomeIcon className="rating-icon" icon={faStar}/>
                        <FontAwesomeIcon className="rating-icon" icon={faStar}/> */}
                    </div>
                </div>
               

                <Link className="btn btn-solid" > View Details </Link>
                {/* to={`/trips/${location._id}`} */}

            </div>
        </div>
    )
}

export default ListingCard