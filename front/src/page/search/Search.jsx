import axios from 'axios';
import React, { useState } from 'react'
import Loading from '../../components/Loading';
import BlogItem from '../../components/BlogItem';

function Search() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSearch, setIsSearch] = useState(false)


    const search = async (title) => {
        if(title.length > 4){
            setIsLoading(true)
            setIsSearch(false)
            await axios.get(`search/${title}`)
            .then((response) => {
                setIsLoading(false)
                setData(response.data)
                setIsSearch(true)
            })
            .catch(() => {
                setIsLoading(false)
                setIsSearch(true)
                setData([])
            })
        }else{
            setIsSearch(false)
        }
    }


    return (
        <div id="search" className='align-self-start pt-3'>
            <div className="page-header d-flex flex-column align-items-center gap-3 pt-2 mb-3">
                <h4 className='text-center'>جستجو سریع</h4>
                <div className='col-3'>
                    <input type="text" className='search-input form-control border border-1 shadow-none'
                        onChange={(e) => search(e.target.value)} placeholder='عنوان پست را جستجو کن...' />
                </div>
            </div>


            <div className="container d-flex flex-wrap">
                {
                    !isLoading ?
                        data.length > 0 ?
                            data.map((blog, index) => (
                                <BlogItem data={blog} key={index} />

                            ))
                            :
                            isSearch&&
                            <h6 className='search-notFound'>نتیجه ای یافت نشد!</h6>
                            :
                            <Loading w={64} h={64} />

                }


            </div>

        </div>
    )
}

export default Search
