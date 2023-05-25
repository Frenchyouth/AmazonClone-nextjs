import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

function Banner() {
    return (
        <div className="relative ">
            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
            <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={4000}
            >
                <div>
                <img loading="lazy" src="https://thumbs2.imgbox.com/1d/91/7zo6KOMj_t.jpeg" alt="icon" />
                </div>

                <div>
                <img loading="lazy" src="https://thumbs2.imgbox.com/d7/47/dpMna95b_t.jpeg" alt="icon" />
                </div>

                <div>
                <img loading="lazy" src="https://thumbs2.imgbox.com/56/63/PDhGPkDM_t.jpeg" alt="icon" />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner
