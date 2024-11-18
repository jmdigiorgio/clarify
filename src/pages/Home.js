// Import the component so we can use it in this component
import AppBar from '../components/AppBar';

export default function Home() {
  return (
    <>
      {/* Call the AppBar */}
      <AppBar />
      <h1>Welcome to the Home Page!</h1>
    </>
  );
}
