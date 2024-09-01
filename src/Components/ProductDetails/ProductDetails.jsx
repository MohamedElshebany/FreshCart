import React, { useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";

export default function ProductDetails() {

  let { id } = useParams()
  const [productDetails, setProductDetails] = useState({})


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  async function getProductDetails() {

    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    console.log(data);
    setProductDetails(data.data)
  }

  useEffect(() => {
    getProductDetails(id)
  }, [])


  return <>

    <div className="flex items-center p-10 ">
      <div className="w-1/4 p-4">
      <Slider {...settings}>
          {productDetails.images?.map((image, index) => <img key={index} src={image} className='w-full' alt="" />)}
        </Slider>
      </div>
      <div className="w-3/4">

        <div>
          <h2 className='font-semibold text-3xl'>{productDetails.title}</h2>
          <p className='my-6 text-gray-500'>{productDetails.description}</p>
          <h3>{productDetails.category?.name}</h3>
          <div className="flex justify-between pb-3">
            <h3>{productDetails.price} <span>EGP</span></h3>
            <h3><i className='fas fa-star rating-color'></i> {productDetails.ratingsAverage} </h3>
          </div>
          <div className='flex'>
      <button className='btn bg-main rounded w-3/4 mx-auto text-white py-2'>+ Add</button>
      <i className="fa-solid fa-heart  text-center font-bold text-3xl"></i>
      </div>
        </div>

      </div>
    </div>
  </>
}
