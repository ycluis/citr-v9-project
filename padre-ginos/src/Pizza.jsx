const Pizza = ({ name, description, image, price }) => {
  return (
    <div className="pizza">
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={image} alt={name} />
      <p>{price}</p>
    </div>
  );
};

export default Pizza;
