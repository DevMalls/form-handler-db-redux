import * as constants from "../utils/constants";
import {useEffect, useState} from 'react';
import Card from '../UI/Card';
import InputDatum from './InputDatum';

const ShowData = () =>{ 
    const [dataList, setDataList] = useState([]);

    useEffect(() => {  
      fetchData();
    },[]);

    const fetchData = async () => {
      const response = await fetch(constants.firebaseInputURL);
      const responseData = await response.json();  
      const loadedData = [];
     
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
          center: responseData[key].center.join(', ')  });
      }}
    setDataList(loadedData);
    };
  const dataLists = dataList && dataList.map((list) => (
      <InputDatum
        key = {list.id}
        id = {list.id}
        name = {list.name}
        gender = {list.gender}
        dateOfBirth = {list.dateOfBirth}
        blood = {list.blood}
        address = {list.address}
        email = {list.email}
        expierence = {list.expierence}
        center = {list.center}
      />
    ));

   
    return (
      <section>
        <Card>
            {dataLists.length <= 0 && <h2>Data is empty</h2>}
            {dataLists.length > 0 && <h2>All Data</h2>}
            <ul>{dataLists}</ul>
        </Card>
      </section>
    );
  };
export default ShowData;