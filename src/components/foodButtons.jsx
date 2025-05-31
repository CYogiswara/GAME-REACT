const FoodButton = ({ food, onClick }) => {
    return (
        <button onClick={() => onClick(food)}>
            {food.name} - {food.cost}
        </button>
    );
};

export default FoodButton;
