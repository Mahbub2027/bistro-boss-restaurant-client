import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

import img1 from '../../../assets/home/slide1.jpg';
import img2 from '../../../assets/home/slide2.jpg';
import img3 from '../../../assets/home/slide3.jpg';
import img4 from '../../../assets/home/slide4.jpg';
import img5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section className='w-10/12 mx-auto my-20'>
            <SectionTitle 
                subtitles={"From 11:00am to 10:00pm"}
                headings={'ORDER ONLINE'}
            >    
            </SectionTitle>

            <Swiper
                slidesPerView={4}
                // centeredSlides={true}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><img src={img1} alt="slide-img" />
                    <h2 className='text-3xl text-center -mt-16 text-white uppercase'>Salad</h2>
                </SwiperSlide>
                <SwiperSlide><img src={img2} alt="slide-img" />
                    <h2 className='text-3xl text-center -mt-16 text-white uppercase'>Pizza</h2>
                </SwiperSlide>
                <SwiperSlide><img src={img3} alt="slide-img" />
                    <h2 className='text-3xl text-center -mt-16 text-white uppercase'>Soup</h2>
                </SwiperSlide>
                <SwiperSlide><img src={img4} alt="slide-img" />
                    <h2 className='text-3xl text-center -mt-16 text-white uppercase'>Desserts</h2>
                </SwiperSlide>
                <SwiperSlide><img src={img5} alt="slide-img" />
                    <h2 className='text-3xl text-center -mt-16 text-white uppercase'>Salad</h2>
                </SwiperSlide>

            </Swiper>
        </section>
    );
};

export default Category;