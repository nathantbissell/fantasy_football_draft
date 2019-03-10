import React from 'react'

export default function TeamPlayer({ player, value }) {
  const { id, title, img, price, total } = player
  const { removePlayer } = value
  return (
    <div className='row my-2 text-capitalize text-center'>
      <div className='col-10 mx-auto col-lg-2'>
        <img
          src={img}
          style={{ width: '5rem', height: '5rem' }}
          className='img-fluid'
          alt='product'
        />
      </div>
      <div className='col-10 mx-auto col-lg-2'>
        <span className='d-lg-none'>Product : </span>
        {title}
      </div>

      <div className='col-10 mx-auto col-lg-2'>
        <span className='d-lg-none'>Price : </span>
        {price}
      </div>
      {/*  */}
      <div className='col-10 mx-auto col-lg-2'>
        <div className='cart-icon' onClick={() => removePlayer(id)}>
          <i className='fas fa-trash' />
        </div>
      </div>
      <div className='col-10 mx-auto col-lg-2'>
        <strong> player total : $ {total}</strong>
      </div>
    </div>
  )
}
