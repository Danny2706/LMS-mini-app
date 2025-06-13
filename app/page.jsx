import AboutUs from "@/components/homeUi/aboutUs"
import Blog from "@/components/homeUi/blog"
import Careers from "@/components/homeUi/careers"
import Footer from "@/components/homeUi/footer"
import HeroPage from "@/components/homeUi/hero"
import Navbar from "@/components/homeUi/navbar"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroPage />
      <Careers />
      <Blog />
      <AboutUs />
      <Footer />
    </>
  )
}
