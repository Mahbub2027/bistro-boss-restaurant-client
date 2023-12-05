
const MenuItems = ({item}) => {
    const {name, image, recipe, price} = item;
    return (
        <div className="flex flex-row gap-5">
            <div>
                <img style={{borderRadius: "0px 100px 100px"}} className="w-32 h-[70px]" src={image} alt="" />
            </div>
            <div>
                <p className=" uppercase">{name}-------------</p>
                <p className="text-sm text-gray-500">{recipe}</p>
            </div>
            <div>
                <p className=" text-yellow-500">${price}</p>
            </div>
        </div>
    );
};

export default MenuItems;