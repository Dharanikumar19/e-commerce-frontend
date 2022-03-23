import React, { useContext } from 'react';
import {GlobalContext} from "../../../GlobalContext";
import "./FilterProduct.css"

function FilterProduct() {
    const state = useContext(GlobalContext)
    const [categories] = state.getCategories.categories
    const [category, setCategory] = state.GetProducts.category
    const [sort, setSort] = state.GetProducts.sort
    const [search, setSearch] = state.GetProducts.search

const handleCategory = (e) => {
        setCategory(e.target.value)
        setSearch("")
}

  return (
      <>
        <div className='container-fluid mt-4 mb-4'>
            <div className='row'>
            <div className='col-lg-3 '>
           <div className='row' style={{marginLeft:"50px"}}>
           <span> Filters:</span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>

           </div>
            </div>

            <div className='col-lg-5'>
                <div className='row' style={{marginLeft:"50px"}}>
            <label>Search:</label>
            <input type="text" value={search} placeholder="Search Your Product Here!!!"
            onChange={e => setSearch(e.target.value.toLowerCase())} />

                </div>
           
            </div>


           <div className='col-lg-3 '>
          <div className='row' style={{marginLeft:"50px"}}>
          <span>Sort By : </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                <option value=''>Options</option>
                <option value='sort=price'>Price : Low to High</option>
                <option value='sort=-price'>Price : High to Low</option>    
                    <option value=''>Arrivals : New</option>
                    <option value='sort=oldest'>Arrivals : Old</option>
                    
                </select>
          </div>
            </div>
            </div>

        </div>
 
      </>
  )
  }
export default FilterProduct;

