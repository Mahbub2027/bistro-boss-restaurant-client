import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';


const FeaturedItems = () => {
    return (
        <div className="featured-img bg-fixed w-10/12 mx-auto my-20 text-white px-20 py-20  ">
            <SectionTitle subtitles={'Check it out'} headings={'FROM OUR MENU'}></SectionTitle>
            <div className="md:flex justify-center  items-center">
                <div>
                    <img className="" src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <h2>Dec 05, 2023</h2>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Possimus doloribus atque incidunt nesciunt. Culpa illo fuga qui sit hic est
                        explicabo aperiam reprehenderit, mollitia harum soluta fugiat omnis unde. Nam
                        nesciunt accusantium aspernatur perferendis cupiditate porro error, tenetur nulla
                        sunt! Libero iure optio nam veritatis ad delectus assumenda eius adipisci!</p>
                        
                        <button className="btn btn-outline border-0 border-b-4">Read more</button>
                </div>
            </div>
        </div>

    );
};

export default FeaturedItems;