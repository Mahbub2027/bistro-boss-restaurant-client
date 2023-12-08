import FoodCart from "../../shared/FoodCart/FoodCart";

const OrderTab = ({ items }) => {
    return (
        <div className='w-10/12 mx-auto my-16 grid grid-cols-1 md:grid-cols-3 gap-10'>
            {
                items.map(item => <FoodCart key={item._id} item={item}></FoodCart>)
            }
        </div>
        
    );
};

export default OrderTab;