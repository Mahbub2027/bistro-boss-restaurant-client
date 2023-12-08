
const FoodCart = ({item}) => {
    const {name, image, recipe, price} = item;
    return (
        <div className="card  bg-slate-200">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-4 top-4 p-1 bg-slate-900 text-white">${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-outline border-0 border-b-4 bg-slate-100 border-orange-500">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;