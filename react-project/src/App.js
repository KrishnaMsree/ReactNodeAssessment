import React, { useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {  
    const [userDetails, setUserDetails] = useState([])
    const getUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8000/userDetails");
          setUserDetails(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchData = async () => {
      getUserDetails();
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
      <div className="container">
        <div className="text-center"><h2 className="text-primary"><b>USER DETAILS</b></h2></div>
        <div className="row">
          <br />
          {userDetails.length===0 ?  (
            <div className="text-center"><h4>Loading Data...</h4></div>
            ) : ( 
              userDetails.map((user,index) => { 
                return (
                  <div className="col-md-4 col-sm col-lg-4 ">
                    <div className="card bg-default" key={index}>
                      <div className="card-header text-center">
                        <img src={user.picture.large} alt="Image not found" width={200}></img>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                      <div className="card-text">
                        <p><b>Gender : </b>{user.gender}</p>
                        <p><b>Gmail : </b>{user.email}</p>
                        <p><b>Address : </b>{user.location.city}, {user.location.state}, {user.location.country}</p>
                      </div>    
                          {/* <p><a href={user.picture.large}>Large Image Link</a></p>
                          <p><a href={user.picture.medium}>Medium Image Link</a></p>
                          <p><a href={user.picture.thumbnail}>Thumbnail Image Link</a></p> */}
                        
                          {/* <span>
                          <img src={user.picture.large} alt="Large Image not found"></img>
                          <img src={user.picture.medium} alt="Medium Image not found"></img>
                          <img src={user.picture.thumbnail} alt="Thumbnail Image not found" ></img>
                        </span> */}
                      </div>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>
      </div>
    )
           
}

export default App;
