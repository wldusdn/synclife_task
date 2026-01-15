import { useTasks } from './hooks/useTasks';

function App() {
  const { tasks } = useTasks();
  console.log("현재 불러온 태스크들:", tasks);

  return (
    <>
    </>
  );
}

export default App
