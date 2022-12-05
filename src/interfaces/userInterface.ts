interface SignUpInterface {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginInterface {
    username: string;
    password: string;
}

export { SignUpInterface, LoginInterface };