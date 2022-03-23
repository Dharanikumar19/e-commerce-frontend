import axios from 'axios';
import {useState, useEffect} from 'react';

function GetCategories() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getCategories = async () =>{
            const result = await axios.get("https://dk-e-commerce.herokuapp.com/api/category")
            setCategories(result.data)
        }
        getCategories()
    }, [callback]);
    
  return (
      {
          categories : [categories, setCategories],
          callback : [callback, setCallback]
      }
  )
  }
export default GetCategories;
