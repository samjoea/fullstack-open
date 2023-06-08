import { useQuery } from "@tanstack/react-query";
import { getAllDiaries } from "./service";
import DiaryEntries from "./components/DiaryEntries";
import AddDiaryForm from "./components/AddDiaryForm";

const App = () => {

  const { data } = useQuery({
    queryKey: ['diaries'],
    queryFn: getAllDiaries,
    select(data) {
      return data.data;
    }
  })

  return (
    <div>
      <AddDiaryForm />
      <DiaryEntries diaries={data} />
  </div>
  );
}

export default App;
