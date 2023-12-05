import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ContactNo from "../ContactNo/ContactNo";
import FeaturedItems from "../FeaturedItems/FeaturedItems";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <ContactNo></ContactNo>
            <FeaturedItems></FeaturedItems>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;