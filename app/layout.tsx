'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ReactNode, useEffect } from 'react';
import { store, RootState } from './redux/store';
import { setAuthenticated } from './redux/features/authSlice';
import { useRouter } from 'next/navigation'; 
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { apiSlice } from "./redux/features/apiSlice";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const AuthHandler = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const mutationState = useSelector((state: RootState) => state.api.mutations);
  console.log('Mutation State:', mutationState);
  useEffect(() => { 
    const token = document.cookie.split('; ').find((row) => row.startsWith('authToken='));
    if (token) {
      dispatch(setAuthenticated(true)); 
    } else {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   // Redirect based on authentication state
  //   if (isAuthenticated) {
  //     router.push('/');
  //     // response.user.role == "trainer" ?  router.push('/trainer-dashboard') : router.push('/client-dashboard');
  //   } else {
  //     router.push('/login'); // Redirect to signin page if not authenticated
  //   }
  // }, [isAuthenticated, router]);

  return (
    <div className="relative">
      {isAuthenticated &&  <Navbar /> }
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
      <main className="pt-[70px]">{children}</main>
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {/* Wrap content in AuthHandler for authentication and redirection logic */}
          <AuthHandler>{children}</AuthHandler>
        </Provider>
      </body>
    </html>
  );
}
