import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  isRequired,
  validatePhone,
  formatPhone
} from "@/lib/validation";
import {
  requestEmailVerification,
  verifyEmailCode,
  checkIdAvailability,
  signup
} from "@/services/authService";

export const useSignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    ownerName: "",
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerificationSent, setIsEmailVerificationSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<{ [key: string]: string }>({});
  
  const [isLoading, setIsLoading] = useState(false);
  const [isIdChecking, setIsIdChecking] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isCodeVerifying, setIsCodeVerifying] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === "phone") {
      value = formatPhone(value);
    }

    if (name === "password" || name === "confirmPassword") {
      const nextPassword = name === "password" ? value : formData.password;
      const nextConfirmPassword = name === "confirmPassword" ? value : formData.confirmPassword;

      if (nextPassword && nextConfirmPassword && nextPassword !== nextConfirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }

      if (name === "password") {
        if (value.length > 0 && !validatePassword(value)) {
          setErrors((prev) => ({ ...prev, password: "영문, 숫자, 특수문자 포함 8자 이상 입력해 주세요." }));
          setSuccess((prev) => {
            const newSuccess = { ...prev };
            delete newSuccess.password;
            return newSuccess;
          });
        } else if (value.length > 0 && validatePassword(value)) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.password;
            return newErrors;
          });
          setSuccess((prev) => ({ ...prev, password: "안전한 비밀번호입니다." }));
        } else {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.password;
            return newErrors;
          });
          setSuccess((prev) => {
            const newSuccess = { ...prev };
            delete newSuccess.password;
            return newSuccess;
          });
        }
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name !== "confirmPassword" && name !== "password" && errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name !== "password" && success[name]) {
      setSuccess((prev) => {
        const newSuccess = { ...prev };
        delete newSuccess[name];
        return newSuccess;
      });
    }
  };

  const checkIdDuplicate = async () => {
    if (!formData.username) {
      setErrors((prev) => ({ ...prev, username: "아이디를 입력해주세요." }));
      return;
    }
    setIsIdChecking(true);
    const result = await checkIdAvailability(formData.username);

    if (result.ok) {
      setSuccess((prev) => ({ ...prev, username: "사용 가능한 아이디입니다." }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.username;
        return newErrors;
      });
    } else {
      setErrors((prev) => ({ ...prev, username: result.message || "아이디 중복 확인 중 오류가 발생했습니다." }));
    }
    setIsIdChecking(false);
  };

  const sendEmailVerification = async () => {
    if (!formData.email || !validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "올바른 이메일을 입력해주세요." }));
      return;
    }

    setIsEmailSending(true);
    setIsEmailVerificationSent(false);

    const result = await requestEmailVerification(formData.email, "sign-up");

    if (result.ok) {
      setIsEmailVerificationSent(true);
      setSentEmail(formData.email);
      setSuccess((prev) => ({ ...prev, email: "인증번호가 발송되었습니다. (데모: 123456 입력)" }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    } else {
      setIsEmailVerificationSent(false);
      setErrors((prev) => ({ ...prev, email: result.message || "인증번호 발송에 실패했습니다." }));
    }
    setIsEmailSending(false);
  };

  const confirmEmailCode = async () => {
    if (!verificationCode) {
      setErrors((prev) => ({ ...prev, verificationCode: "인증번호를 입력해 주세요." }));
      return;
    }

    setIsCodeVerifying(true);
    setIsEmailVerified(false);

    const result = await verifyEmailCode(sentEmail, verificationCode, "sign-up");

    if (result.ok) {
      setIsEmailVerified(true);
      sessionStorage.setItem("signupToken", result.signupToken || "fake-token");
      
      setSuccess((prev) => {
        const newSuccess = { ...prev };
        delete newSuccess.email;
        return newSuccess;
      });
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.verificationCode;
        return newErrors;
      });
    } else {
      setIsEmailVerified(false);
      setErrors((prev) => ({ ...prev, verificationCode: result.message || "인증번호가 일치하지 않습니다." }));
    }
    setIsCodeVerifying(false);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!isRequired(formData.username)) newErrors.username = "아이디를 입력해 주세요.";
    if (!validateEmail(formData.email)) newErrors.email = "올바른 이메일 형식이 아닙니다.";
    if (!isEmailVerified) newErrors.email = "이메일 인증을 완료해 주세요.";
    if (!validatePassword(formData.password)) newErrors.password = "영문, 숫자, 특수문자 포함 8자 이상 입력해 주세요.";
    if (!validateConfirmPassword(formData.password, formData.confirmPassword)) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!validatePhone(formData.phone)) newErrors.phone = "올바른 전화번호 형식이 아닙니다.";
    if (!isRequired(formData.ownerName)) newErrors.ownerName = "이름을 입력해 주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const signupToken = sessionStorage.getItem("signupToken");

    if (!signupToken) {
      alert("인증 토큰이 누락되었습니다. 다시 이메일 인증을 진행해 주세요.");
      return;
    }

    setIsLoading(true);
    const result = await signup({
      userName: formData.username,
      email: formData.email,
      password: formData.password,
      name: formData.ownerName,
    }, signupToken);

    if (result.ok) {
      alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      sessionStorage.removeItem("signupToken");
      navigate("/login");
    } else {
      alert(result.message || "회원가입에 실패했습니다.");
    }
    setIsLoading(false);
  };

  return {
    form: {
      data: formData,
      errors,
      success,
      handleChange,
      handleSubmit,
    },
    emailAuth: {
      code: verificationCode,
      setCode: setVerificationCode,
      isSent: isEmailVerificationSent,
      isVerified: isEmailVerified,
      send: sendEmailVerification,
      confirm: confirmEmailCode,
    },
    status: {
      isLoading,
      isIdChecking,
      isEmailSending,
      isCodeVerifying,
    },
    actions: {
      checkIdDuplicate,
    },
  };
};
