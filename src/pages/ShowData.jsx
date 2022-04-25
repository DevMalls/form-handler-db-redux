import {useEffect, useState} from 'react';
import Card from '../UI/Card';
import InputDatum from './InputDatum';
const ShowData = () =>{ 
    const [data, setData] = useState([]);
    const dataList  = data && data.map((eachData) => (
      <InputDatum
        key = {eachData.id}
        id = {eachData.id}
        name = {eachData.name}
        gender = {eachData.gender}
        dateOfBirth = {eachData.dateOfBirth}
        blood = {eachData.blood}
        address = {eachData.address}
        email = {eachData.email}
        expierence = {eachData.expierence}
        center = {eachData.center}
      />
    ));
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('https://form-inputs-8f8ee-default-rtdb.firebaseio.com/inputs.json');
        const responseData = await response.json();  
        const loadedData = [];
        // console.log("🚀 ~ file: ShowData.jsx ~ line 29 ~ fetchData ~ loadedData", loadedData)
        if(responseData !== null){
        for (const key in responseData) {
          loadedData.push({
          id: key,
          name: responseData[key].name,
          gender: responseData[key].gender,
          dateOfBirth: responseData[key].dateOfBirth,
          blood: responseData[key].blood,
          address: responseData[key].address,
          email: responseData[key].email,
          expierence: responseData[key].expierence,
          center: responseData[key].center.join(', ')  ,
        });
      }}

        setData(loadedData);
      };
  
      fetchData();
    },[]);
  
   
    return (
      <section>
        <Card>
            {dataList.length <= 0 && <h2>Data is empty</h2>}
            {dataList.length > 0 && <h2>Show All Data</h2>}
            <ul>{dataList}</ul>
        </Card>
      </section>
    );
  };
export default ShowData;