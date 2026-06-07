import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await login(formData.username, formData.password);

    if (result.ok && result.user) {
      if (result.accessToken) localStorage.setItem("accessToken", result.accessToken);
      if (result.refreshToken) localStorage.setItem("refreshToken", result.refreshToken);
      
      authLogin(result.user);
      navigate("/"); // 로그인 성공 시 대시보드로 이동
    } else {
      setError(result.message || "로그인에 실패했습니다.");
    }

    setIsLoading(false);
  };

  return {
    form: {
      data: formData,
      error,
      handleChange,
      handleSubmit,
    },
    status: {
      isLoading,
    },
  };
};
