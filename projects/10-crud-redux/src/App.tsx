import { Toaster } from 'sonner';
import { ListOfUsers } from './components/ListOfUsers';

function App() {
  return (
    <div className="flex w-full flex-col items-center py-4">
      <div className="w-[50rem]">
        <ListOfUsers />
        <Toaster richColors/>
      </div>
    </div>
  );
}

export default App;
