import './App.css';
import Item from './components/Item';
import { useItems } from './hooks/useItems';
import { useSEO } from './hooks/useSEO';

export type ItemId = `${string}-${string}-${string}-${string}-${string}`;

export interface Item {
  //id created with crypto.randomUUID()
  id: ItemId;
  timestamp: number;
  text: string;
}
/*
const INITAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Cerezas 🍒',
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Fresas 🍓',
  },
];
*/
function HomePage() {
  const { items, addItem, removeItem } = useItems();
  useSEO({
    title:
      items.length === 0
        ? 'Prueba tecnica lista de elementos'
        : `[${items.length}] Prueba tecnica lista de elementos`,
    description: `Lista de elementos: ${items
      .map((item) => item.text)
      .join(', ')}`,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { elements } = e.currentTarget;
    // const input = elements.namedItem('item') as HTMLInputElement;

    const input = elements.namedItem('item');
    const isInput = input instanceof HTMLInputElement; //Js way
    if (!isInput || input == null) return;

    addItem(input.value);

    input.value = '';
  };

  const handleRemoveItem = (id: ItemId) => {
    removeItem(id);
  };

  return (
    <main>
      <aside>
        <h1>Prueba tecnica 💻</h1>
        <h2>Añadir y eliminar elementos de una lista.</h2>
        <form onSubmit={handleSubmit} aria-label='Add item to list'>
          <label>
            Nuevo elemento:
            <input
              type='text'
              name='item'
              required
              placeholder='Nuevo elemento'
              autoFocus
              autoComplete='off'
            />
          </label>
          <button>Agregar elemento</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>

        {items.length === 0 ? (
          <>
            <p>
              <strong>No hay elementos en la lista. 😢</strong>
            </p>
            <img src='./empty.svg' alt='empty' />
          </>
        ) : (
          <ul>
            {items.map((item) => {
              return (
                <Item
                  handleClick={() => handleRemoveItem(item.id)}
                  key={item.id}
                  {...item}
                />
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

export default HomePage;
