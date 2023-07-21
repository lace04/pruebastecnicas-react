import { type User, SortBy } from '../types.d'

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (uuid: string) => void
  changeSorting: (sort: SortBy) => void
}

export function UsersList ({
  users,
  showColors,
  deleteUser,
  changeSorting
}: Props) {
  return (
    <div className='mt-5 flex flex-col justify-center items-center'>
      <h1 className='text-2xl mb-5'>Lista Usuarios</h1>
      <table className='w-4/5 text-center'>
        <thead>
          <tr>
            <th>Foto</th>
            <th
              className='cursor-pointer border-r-2 hover:bg-zinc-800 hover:rounded-md'
              onClick={() => {
                changeSorting(SortBy.NAME)
              }}
            >
              Nombre
            </th>
            <th
              className='cursor-pointer border-r-2 hover:bg-zinc-800 hover:rounded-md'
              onClick={() => {
                changeSorting(SortBy.LAST)
              }}
            >
              Apellido
            </th>
            <th
              className='cursor-pointer border-r-2 hover:bg-zinc-800 hover:rounded-md'
              onClick={() => {
                changeSorting(SortBy.COUNTRY)
              }}
            >
              Pais
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            // const backgroundColor = index % 2 === 0 ? '#333' : '#555';
            // const color = showColors ? backgroundColor : 'transparent';

            return (
              <tr
                key={user.login.uuid}
                className={`${
                  showColors
                    ? index % 2 === 0
                      ? 'bg-zinc-800'
                      : 'bg-zinc-700'
                    : ''
                }`}
              >
                <td className='flex items-center justify-center'>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button
                    className='bg-zinc-700 p-1 rounded-md hover:bg-zinc-600 border transition'
                    onClick={() => { deleteUser(user.login.uuid) }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
