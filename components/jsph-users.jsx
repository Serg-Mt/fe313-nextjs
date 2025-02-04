import { useEffect, useRef, useState } from 'react';

export function UserList({ url }) {
  const
    [users, setUsers] = useState(null),
    [error, setError] = useState(null),
    [reload, setReload] = useState(0),
    onDelete = async id => {
      await fetch(url + '/' + id, {
        method: 'DELETE'
      });
      setReload(prev => 1 + prev);
    };
  useEffect(() => {
    go();
    async function go() {
      try {
        const
          response = await fetch(url);
        console.log('response', response);
        if (!response.ok) throw new Error('fetch' + response.status);
        const
          result = await response.json();
        setUsers(result);
        setError(null);
      } catch (error) {
        setError(error);
      }
    }
  }
    , [url, reload]);


  if (error) return <ErrorComponent error={error} />
  if (!users) return <Spinner />
  return <>
    <hr />
    <AddForm url={url} reload={() => setReload(prev => 1 + prev)} />
    <hr />
    <ol>
      {users.map(user => <li key={user.id}>
        {user.name} ({user.email}) <button onClick={() => onDelete(user.id)}> ❌</button>
      </li>)}
    </ol>
  </>
}

function ErrorComponent({ error }) {
  return <>
    ERROR:{String(error)}
  </>
}

function Spinner() {
  return <>loading....</>
}

function AddForm({ url, reload }) {
  const
    [name, setName] = useState('user1'),
    ref = useRef(null);
  const
    onClick = async () => {
      const
        email = ref.current.value,
        formData = { name, email };
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      reload();
    };
  return <>
    <label >name:<input value={name} onInput={event => setName(event.target.value)} /></label>
    <label >email:<input ref={ref} type="email" /></label>
    <button onClick={onClick}>Add user</button>
  </>
}