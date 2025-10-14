import { useState } from "react";
import type { userProps } from "@/Types/User";
import type { companyProps } from "@/Types/Company";
// Signup input handling hook with individual useState for each field
export const useSignupInputHandling = ():userProps => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // Add more fields as needed

  const [errors, setErrors] = useState({});

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setAddress("");
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password && password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!phone) newErrors.phone = "Phone is required";
    if (!address) newErrors.address = "Address is required";
    // Add more validation as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    phone, setPhone,
    address, setAddress,
    errors, setErrors,
    reset,
    validate,
  };
};

// Login input handling hook with individual useState for each field
export const useLoginInputHandling = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const reset = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    email, setEmail,
    password, setPassword,
    errors, setErrors,
    reset,
    validate,
  };
};

// Company Signup input handling hook with individual useState for each field
export const useCompanySignupInputHandling = ():companyProps => {
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [medicalLicense, setMedicalLicense] = useState("");
  const [adminName, setAdminName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const reset = () => {
    setCompanyName("");
    setCompanyType("");
    setMedicalLicense("");
    setAdminName("");
    setPhone("");
    setCompanyEmail("");
    setBusinessAddress("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!companyName) newErrors.companyName = "Company Name is required";
    if (!companyType) newErrors.companyType = "Company Type is required";
    if (!medicalLicense) newErrors.medicalLicense = "Medical License Number is required";
    if (!adminName) newErrors.adminName = "Administrator Name is required";
    if (!phone) newErrors.phone = "Phone Number is required";
    if (!companyEmail) newErrors.companyEmail = "Company Email is required";
    if (!businessAddress) newErrors.businessAddress = "Business Address is required";
    if (!password) newErrors.password = "Password is required";
    if (password && password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    companyName, setCompanyName,
    companyType, setCompanyType,
    medicalLicense, setMedicalLicense,
    adminName, setAdminName,
    phone, setPhone,
    companyEmail, setCompanyEmail,
    businessAddress, setBusinessAddress,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    errors, setErrors,
    reset,
    validate,
  };
};

// Company Login input handling hook
export const useCompanyLoginInputHandling = () => {
  const [companyEmail, setCompanyEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const reset = () => {
    setCompanyEmail("");
    setPassword("");
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!companyEmail) newErrors.companyEmail = "Company Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    companyEmail, setCompanyEmail,
    password, setPassword,
    errors, setErrors,
    reset,
    validate,
  };
};



// User Login input handling hook
export const useUserLoginInputHandling = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reset = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    email, setEmail,
    password, setPassword,
    errors, setErrors,
    reset,
    validate,
  };
};