// pages/services.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Services() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
        <p className="text-gray-600 mt-4 max-w-2xl text-center">
          We offer a variety of services tailored to your needs.
        </p>
      </main>
      <Footer />
    </div>
  );
}
