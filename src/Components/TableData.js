import React, { useEffect, useState } from 'react';
import './TableData.css';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ReactPaginate from "react-paginate";
import { getByDisplayValue } from "@testing-library/dom";

const api = "https://intense-tor-76305.herokuapp.com/merchants";


const TableData = () => {

   
    const [data , setData] = useState([]);
    const [pageNumber , setPageNumber] = useState(0);
     const [bidToggleBtn , setbidToggleBtn] = useState(false);
   

    const getdata = async () =>{
        const uaerData = await fetch(api);
        const userJson = await uaerData.json();
        let filterUserData = userJson.filter((item) => item.firstname);
        console.log(filterUserData);
        setData(filterUserData);
    }

    const bidToggle = () =>{
              setbidToggleBtn(!bidToggleBtn);
    }
  
    useEffect(()=>{
        getdata();
    },[])

const getBid = (bids) =>{
  
       if(bids.length === 0){
           return 0;
       }
       if(bids.length === 1){
           return bids[0].amount;
       }

       let copyBids = bids.sort((a,b)=> a.amount - b.amount);
       if(bidToggleBtn){
           return copyBids[0].amount ;
       }
       if(!bidToggleBtn){
        return copyBids[copyBids.length - 1].amount ;
    }
}

       const visitedUser = pageNumber * 8;

         const displayData = data.slice(visitedUser, visitedUser + 10);

//console.log(displayData);

         const changePage = ({ selected }) => {
             setPageNumber(selected);
          };


    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                         
                        <th>Customer name</th>
                        <th> Email</th>
                        <th> Phone</th>
                        <th>  Premium</th>
                        <th>Max/Min bid <button onClick={bidToggle} >  {bidToggleBtn ? <ToggleOnIcon /> : <ToggleOffIcon/>}</button> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        displayData.map( (singledata , id)=>{
                            return <tr key={id}>
                                 
                                  <td><img className='rounded-circle imgtag' src={`${singledata.avatarUrl}`} alt=".."/>{` ${singledata.firstname} ${singledata.lastname}`}</td>
                                  <td>{singledata.email}</td>
                                  <td>{singledata.phone}</td>
                                  <td>{singledata.hasPremium ? "Yes" : "No"}</td>
                                  <td>{getBid(singledata.bids)}</td>
                            </tr>
                        } )
                    }
                </tbody>
            </table>
            <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(data.length / 10)}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
        </div>
    );
};

export default TableData;


