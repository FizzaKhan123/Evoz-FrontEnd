'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import useSignUpForm from "../../hooks/useSignUpForm";
import InputField from "../../components/InputField";
import RadioField from "../../components/RadioField";



export default function SignUp() {
  const { form, handleChange, handleSubmit, error } = useSignUpForm();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 relative overflow-hidden"
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute w-72 h-72 bg-orange-500 opacity-30 rounded-full top-10 left-10"
      ></motion.div>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="absolute w-96 h-96 bg-orange-600 opacity-20 rounded-full bottom-10 right-10"
      ></motion.div>
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-96 relative z-10">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Sign Up</h2>
        <InputField label="Full Name" type="text" value={form.fullName} onChange={handleChange} name="fullName" />
        <InputField label="Email" type="email" value={form.email} onChange={handleChange} name="email" />
        <InputField label="Password" type="password" value={form.password} onChange={handleChange} name="password" />
        <InputField label="Confirm Password" type="password" value={form.confirmPassword} onChange={handleChange} name="confirmPassword" />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        
        <div className="flex items-center justify-between my-4">
          <RadioField label="Sign up as Client" value="client" checked={form.role === "client"} onChange={handleChange} name="role" />
          <RadioField label="Sign up as Trainer" value="trainer" checked={form.role === "trainer"} onChange={handleChange} name="role" />
        </div>

        <button onClick={handleSubmit} className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300">Sign Up</button>
        
        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account? <Link href="/login" className="text-orange-500 hover:underline">Sign In</Link>
        </p>
      </div>
    </motion.div>
  );
}
