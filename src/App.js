import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
import { DragDropContext } from 'react-beautiful-dnd';

const App = () => {
  const onDragEnd = (result) => {
    console.log(result);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="main">
        <DragAndDrop />
      </div>
    </DragDropContext >
  );
}

export default App;
