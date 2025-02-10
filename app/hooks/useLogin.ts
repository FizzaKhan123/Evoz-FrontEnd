import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignInMutation } from "../redux/features/apiSlice";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated ,setRole} from "../redux/features/authSlice";
import { ErrorResponse } from "../Types/type";
import { RootState } from "../redux/store";

interface LoginFormState {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [login, { isLoading }] = useSignInMutation();
  const role = useSelector((state: RootState) => state.auth.role);
  const router = useRouter();
  const dispatch=useDispatch();
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await login(form).unwrap();
        toast.success("User Sign In Successfully");
        const token = response?.access_token; 
        if (token) {
            Cookies.set('authToken', token, { expires: 7 });
            dispatch(setAuthenticated(true)); 
            dispatch(setRole(response.user.role))
        }
          role == "trainer" ?  router.push('/trainer-dashboard') : role == "client"  ?  router.push('/client-dashboard') : router.push('/admin-dashboard')  ;

  
      } catch (err) {
        const error = err as ErrorResponse;
        console.log("sign in error",err);
        toast.error(error?.data?.message);
      }
  };

  return { form, handleChange, handleSubmit, isLoading, error };
};

export default useLoginForm;
