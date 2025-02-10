import { useState } from "react";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useSignUpMutation } from "../redux/features/apiSlice";
import { useDispatch } from 'react-redux';
import { setAuthenticated } from "../redux/features/authSlice";
import { useRouter } from "next/navigation";

interface FormState {
  fullName: string;
  email: string;
  password: string;
  role: "client" | "trainer";
}

const useSignUpForm = () => {
  const [form, setForm] = useState<FormState & { confirmPassword: string }>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
  });
  const [error, setError] = useState<string | null>(null);
  const [signUp, { isLoading, error:signUpError }] = useSignUpMutation();
  const dispatch=useDispatch();
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    
    const { confirmPassword, ...formData } = form;
   
    console.log("Form submitted", formData);


    try {
        const response = await signUp(formData).unwrap();
        toast.success("User Sign Up Successfully");
          const token = response?.access_token; 
                if (token) {
                    Cookies.set('authToken', token, { expires: 7 });
                    dispatch(setAuthenticated(true));
                    router.push('/');   
       }
      } catch (err) {
        // toast.error(Error?.data?.message);
      }
  };

  return { form, handleChange, handleSubmit, error };
};

export default useSignUpForm;
