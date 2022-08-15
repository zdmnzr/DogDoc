import '../styles/globals.css'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='w-full xl:w-[1280px] mx-auto overflow-hidden h-[100vh]'>
      {/* bg-[#F8F8F8]  */}
      <Navbar></Navbar>
      <div className={`overflow-auto h-full md:w-full md:flex md:justify-center md:items-center${styles.hidden_scroll}`}>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
