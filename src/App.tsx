import { useEffect, useMemo, useRef, useState } from 'react'
import { UsersList } from './components/UsersList'
import { type User, SortBy } from './types.d'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filteredCountry, setFilteredCountry] = useState<string | null>(null)

  const originalUsuars = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsuars.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results)
        originalUsuars.current = res.results
      })
      .catch((err) => { console.log(err) })
  }, [])

  const filteredUsers = useMemo(() => {
    // console.log('filteredUsers')
    return filteredCountry !== null && filteredCountry.length > 0
      ? users.filter((user) => {
        return user.location.country
          .toLowerCase()
          .includes(filteredCountry.toLowerCase())
      })
      : users
  }, [users, filteredCountry])

  const sortedUsers = useMemo(() => {
    // console.log('sortedUsers')
    // return sorting === SortBy.COUNTRY
    //   ? filteredUsers.toSorted((a, b) =>
    //       a.location.country.localeCompare(b.location.country)
    //     )
    //   : filteredUsers;

    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    }
    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) =>
        a.name.first.localeCompare(b.name.first)
      )
    }
    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted((a, b) =>
        a.name.last.localeCompare(b.name.last)
      )
    }
    return filteredUsers
  }, [filteredUsers, sorting])

  return (
    <div>
      <h1 className='text-4xl text-center font-semibold'>
        Prueba tecnica Teact + TypeScript
      </h1>

      <header className='mt-4 flex justify-center gap-x-2'>
        <button
          className='bg-zinc-900 p-2 rounded-md hover:bg-zinc-950 border'
          onClick={toggleColors}
        >
          {showColors ? 'No colorear fila' : 'Colorear fila'}
        </button>

        <button
          className='bg-zinc-900 p-2 rounded-md hover:bg-zinc-950 border'
          onClick={toggleSortByCountry}
        >
          Ordenar por pais
        </button>

        <button
          className='bg-zinc-900 p-2 rounded-md hover:bg-zinc-950 border'
          onClick={handleReset}
        >
          Reestablecer
        </button>

        <input
          type='text'
          placeholder='Buscar por pais'
          autoFocus
          className='bg-zinc-700 p-2 rounded-md hover:bg-zinc-800 border'
          onChange={(e) => {
            setFilteredCountry(e.target.value)
          }}
        />
      </header>

      <UsersList
        showColors={showColors}
        users={sortedUsers}
        deleteUser={handleDelete}
        changeSorting={handleChangeSort}
      />
    </div>
  )
}

export default App
