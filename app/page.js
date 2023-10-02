import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductCarousel from './components/ProductCarousel'
import './styles.css'
export default function Home() {
  return (
    <main>
      <Navbar />
      <ProductCarousel />
      <main className='main-home'>
        <div className='gloria-card'>
          <h2>About Us</h2>
          <p>
            Amazing G is more than a store for us. It is more than an online
            shop, it is more than a company. Amazing G is a gathering of those
            who want to help others. We strive to be able to help those who want
            to make something of themselves.{' '}
          </p>
          <p>
            With all that is going on in the world, we at Amazing G believe that
            we must all look out for each other. That is why we are here to
            help. Gloria Apolinario is a verified distributor of Alibaba goods
            and products, and is using this position to pay it forward as much
            as possible. The prices you see are solid prices Gloria has decided
            on, keeping it at the lowest possible margin for ourselves and the
            highest profit for our customers.
          </p>
        </div>
      </main>
    </main>
  )
}
