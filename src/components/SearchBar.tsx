import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function SearchBar({children}: Props) {
  return (
    <div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Recipients username" aria-label="Recipients username" aria-describedby="button-addon2"></input>
  <button className="btn btn-outline-secondary" type="button" id="button-addon2">{children}</button>
</div>
  )
}

export default SearchBar