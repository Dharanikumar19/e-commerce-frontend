import axios from 'axios';
import React, { useState, useContext } from 'react';
import { GlobalContext } from "./../../../GlobalContext";
import "./Categories.css"
function Categories() {

  const state = useContext(GlobalContext)
  const [categories] = state.getCategories.categories
  const [category, setCategory] = useState('')
  const [token] = state.token
   const [callback, setCallback] = state.getCategories.callback
   const [onEdit, setOnEdit] = useState(false)
  const [id,setID] = useState('')


  const createCategory = async e => {
    e.preventDefault()
    try {
      if (onEdit) {
        const result = await axios.put(`https://dk-e-commerce.herokuapp.com/api/category/${id}`, { name: category }, {
          headers: { Authorization: token }
        })
        alert(result.data.message)
      } else {
        const result = await axios.post('https://dk-e-commerce.herokuapp.com/api/category', { name: category }, {
          headers: { Authorization: token }
        })
        alert(result.data.message)
      }
      setOnEdit(false)
      setCategory('')
      setCallback(!callback)

    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const editCategory = async (id, name) => {
    setID(id)
    setCategory(name)
    setOnEdit(true)
  }

  const deleteCategory = async id => {
    try {
      const result = await axios.delete(`https://dk-e-commerce.herokuapp.com/api/category/${id}`, {
        headers: { Authorization: token }
      })
      alert(result.data.message)
      setCallback(!callback)
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  return (
    <>
      <div className="categories">
        <form className='mt-3' onSubmit={createCategory}>
          <label>Category</label>
          <input type="text" name="category" value={category} required
            onChange={e => setCategory(e.target.value)} />

          <button type="submit">{onEdit ? 'Update' : 'Create'} </button>
        </form>

        <div className="col-category">
          {
            categories.map(category => (
              <div className="row" key={category._id}>
                <p>{category.name}</p>
                <div>
                  <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                  <button onClick={() => deleteCategory(category._id)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Categories;
