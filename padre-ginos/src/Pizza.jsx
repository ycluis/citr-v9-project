const Pizza = ({ name, description, image }) => {
  return (
    <>
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={image} alt={name} />
    </>
  );
};

export default Pizza;
