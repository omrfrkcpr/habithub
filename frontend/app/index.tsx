import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
type Todo = {
  id: number,
  name: string,
  isDone: number
}
async function fetchHello() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL
  const response = await fetch(`${apiUrl}/todos`);
  const data = await response.json();
  return data
}

export default function App() {
  const [data, setData] = useState<Todo[]>([])
  useEffect(() => {
    async function fetchData() {
      const data = await fetchHello()
      setData(data.todos)
    }
    fetchData()
  }, [])

  return (
    <>
      <View className='bg-red-500'>
        {
          data.map(todo => <Text key={todo.id}>{todo.name}</Text>)
        }
      </View>
    </>
  );
}