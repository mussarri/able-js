// project-imports
import { redirect } from 'next/navigation';
import Login from 'views/authentication/Login';

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  return redirect('/user/buy-session');
  // return <Login />;
}
