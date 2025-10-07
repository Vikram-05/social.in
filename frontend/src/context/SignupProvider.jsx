import React, { createContext, useState, useContext } from "react";

const SignupContext = createContext();

export function useSignup() {
  return useContext(SignupContext);
}

export function SignupProvider({ children }) {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  return (
    <SignupContext.Provider value={{ signupData, setSignupData }}>
      {children}
    </SignupContext.Provider>
  );
}