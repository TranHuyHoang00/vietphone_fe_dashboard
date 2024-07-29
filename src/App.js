import Index from './apps/index';
// import { inject } from '@vercel/analytics';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');
function App() {
  return (
    <div>
      {/* {inject()} */}
      <Index />
    </div>
  );
}
export default App;

