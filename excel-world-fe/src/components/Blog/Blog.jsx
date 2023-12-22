// import dataBlog from '../data/datablog.json'
import CartBlog from './CartBlog';

const Blog = () => {

  return (
    <>
      <div className="blog">
        <div className="container">
          <div className="row ">
            <div className="programming col-md-7 col-10 ms-md-0 ms-4">
           <CartBlog/>
            </div>
            <div className="right-box col-md-4 col-10">

            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Blog