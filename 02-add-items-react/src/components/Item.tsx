function Item({
  text,
  handleClick,
}: {
  text: string;
  handleClick: () => void;
}) {
  return <li onClick={() => handleClick()}>{text}</li>;
}

export default Item;
