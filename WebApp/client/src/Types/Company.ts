export type companyProps = {
    companyName: string;
    setCompanyName: (v: string) => void;
    companyType: string;
    setCompanyType: (v: string) => void;
    medicalLicense: string;
    setMedicalLicense: (v: string) => void;
    adminName: string;
    setAdminName: (v: string) => void;
    phone: string;
    setPhone: (v: string) => void;
    companyEmail: string;
    setCompanyEmail: (v: string) => void;
    businessAddress: string;
    setBusinessAddress: (v: string) => void;
    password: string;
    setPassword: (v: string) => void;
    confirmPassword: string;
    setConfirmPassword: (v: string) => void;
    errors: Record<string, string>;
    setErrors: (v: Record<string, string>) => void;
    reset: () => void;
    validate: () => boolean | Promise<boolean>;
}