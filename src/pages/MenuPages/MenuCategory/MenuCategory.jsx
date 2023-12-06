import Cover from "../../shared/Cover/Cover";
import MenuItems from "../../shared/MenuItems/MenuItems";

const MenuCategory = ({items, title, img}) => {
    return (
        <div>
            { title && <Cover img={img} title={title}></Cover>}
            <div className="w-10/12 mx-auto my-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                {
                    
                    items.map(item=> <MenuItems 
                        key={item._id} 
                        item={item}
                        ></MenuItems>)
                }
            </div>
        </div>
    );
};

export default MenuCategory;