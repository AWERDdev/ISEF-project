export type userProps = {
    name: string;
    setName: (v: string) => void;
    email: string;
    setEmail: (v: string) => void;
    password: string;
    setPassword: (v: string) => void;
    confirmPassword: string;
    setConfirmPassword: (v: string) => void;
    phone: string;
    setPhone: (v: string) => void;
    address: string;
    setAddress: (v: string) => void;
    errors: Record<string, string>;
    setErrors: (v: Record<string, string>) => void;
    reset: () => void;
    validate: () => boolean | Promise<boolean>;
  } 
  