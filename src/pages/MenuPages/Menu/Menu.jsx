import { Helmet } from 'react-helmet-async';
import Cover from '../../shared/Cover/Cover';
import useMenu from '../../../hook/useMenu';
import MenuCategory from '../MenuCategory/MenuCategory';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import menuImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';

const Menu = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item=> item.category === 'offered')
    const dessert = menu.filter(item=> item.category === 'dessert')
    const pizza = menu.filter(item=> item.category === 'pizza')
    const salad = menu.filter(item=> item.category === 'salad')
    const soup = menu.filter(item=> item.category === 'soup')

    return (
        <div className='space-y-10'>
            <Helmet>
                <title>Bistro boss | Menu</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <Cover img={menuImg} title={"Our Menu"}></Cover>
            <SectionTitle subtitles='Dont miss' headings={'TODAYS OFFER'}></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert items */}
            <MenuCategory items={dessert} img={dessertImg} title={"dessert"}></MenuCategory>
            {/* pizza */}
            <MenuCategory items={pizza} img={pizzaImg} title={"pizza"}></MenuCategory>
            {/* salad */}
            <MenuCategory items={salad} img={saladImg} title={"salad"}></MenuCategory>
            {/* soup */}
            <MenuCategory items={soup} img={soupImg} title={"soup"}></MenuCategory>
        </div>
    );
};

export default Menu;