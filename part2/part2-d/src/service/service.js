import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getData = async () => {
   try {
      const { data } = await axios.get(baseUrl);
      return data;
    } catch (error) {
      console.log(error.response.data)
    }
}

const createData = async (dataObj) => {
   try {
      const { data } = await axios.post(baseUrl, dataObj);
      return data;
   } catch (error) {
     console.log(error.response.data)
   }
}

const updateData = async (id, dataObj) => {
   try {
      const { data } = await axios.put(`${baseUrl}/${id}`, dataObj);
      return data;
   } catch (error) {
     console.log(error.response.data)
   }
}

const deleteData = async (id) => {
   await axios.delete(`${baseUrl}/${id}`);
}


export { getData, createData, updateData, deleteData };