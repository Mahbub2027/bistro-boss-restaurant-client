import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItems from "../../shared/MenuItems/MenuItems";
import useMenu from "../../../hook/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu();  // custom hook
    const popularItem = menu.filter(item=> item.category === 'popular')
    // const [menu, setMenu] = useState([])
    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res=>res.json())
    //     .then(data=> {
    //         const popularItem = data.filter(item=> item.category === 'popular')
    //         setMenu(popularItem)})
    // },[])
    return (
        <div>
            <SectionTitle
                subtitles={'Check it out'}
                headings={'FROM OUR MENU'}
            ></SectionTitle>
            <div className="w-10/12 mx-auto my-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                {
                    popularItem.map(item=> <MenuItems 
                        key={item._id} 
                        item={item}
                        ></MenuItems>)
                }
            </div>
            <div className="flex justify-center">
                <button className="btn btn-outline border-0 border-b-4">View Full  Menu</button>
            </div>
        </div>
    );
};

export default PopularMenu;