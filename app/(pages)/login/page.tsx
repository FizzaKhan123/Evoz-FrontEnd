'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import useLoginForm from "../../hooks/useLogin";
import InputField from "@/app/components/InputField";
// import RadioField from "@/app/components/RadioField";


export default function Login() {
  const { form, handleChange, handleSubmit, isLoading, error } = useLoginForm();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 relative overflow-hidden">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute w-72 h-72 bg-orange-500 opacity-30 rounded-full top-10 left-10"></motion.div>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute w-96 h-96 bg-orange-600 opacity-20 rounded-full bottom-10 right-10"></motion.div>
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-96 relative z-10">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <InputField label="Email" type="email" value={form.email} onChange={handleChange} name="email" />
        <InputField label="Password" type="password" value={form.password} onChange={handleChange} name="password" />
        
        {/* <div className="flex items-center justify-between my-4">
          <RadioField label="Login as Client" value="client" checked={form.role === "client"} onChange={handleChange} name="role" />
          <RadioField label="Login as Trainer" value="trainer" checked={form.role === "trainer"} onChange={handleChange} name="role" />
        </div> */}

        <button onClick={handleSubmit} className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        
        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account? <Link href="/signup" className="text-orange-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </motion.div>
  );
}
