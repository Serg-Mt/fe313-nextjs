import { useState } from 'react';
import { UserList } from '../components/jsph-users';

const APIs = [
  'https://jsonplaceholder.typicode.com/users',
  'http://localhost:3333/users'
]

export default function JSPHPage() {
  const
    [url, setUrl] = useState(APIs[0]);

  return <>
    <h1>JSPH USERS</h1>
    <select value={url} onChange={event => setUrl(event.currentTarget.value)}>
      {APIs.map(s => <option key={s} value={s}>{s}</option>)}
    </select>

    <UserList url={url} />
  </>
}