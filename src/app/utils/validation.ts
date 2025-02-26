export const validateUserLogin = (userLogin: string): string | null => {
    const userLoginRegex = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
    if (!userLogin) return "ID는 필수입니다.";
    if (!userLoginRegex.test(userLogin)) return "ID는 영문자로 시작하는 4~16자 영문자 또는 숫자여야 합니다.";
    return null;
  };
  
  export const validatePassword = (password: string): string | null => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!password) return "비밀번호는 필수입니다.";
    if (!passwordRegex.test(password)) return "비밀번호는 영문+숫자+특수문자를 포함한 8~16자여야 합니다.";
    return null;
  };
  
  export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    if (!confirmPassword) return "비밀번호 확인은 필수입니다.";
    if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
    return null;
  };
  
  export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return null; // 이메일은 선택 사항이므로 빈 값이면 검증하지 않음
    if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다.";
    return null;
  };
  
  export const checkUserLoginExists = async (userLogin: string): Promise<boolean> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/checkUserLogin?userLogin=${userLogin}`);
      if (!response.ok) throw new Error("서버 오류");
      const data = await response.json();
      return data.exists; // 서버에서 true/false 반환한다고 가정
    } catch (error) {
      console.error("아이디 중복 확인 오류:", error);
      return false; // 오류 시 중복된 것으로 간주하지 않음
    }
  };
  