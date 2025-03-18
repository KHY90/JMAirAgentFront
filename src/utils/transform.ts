export function getInstallStatusText(status: string): string {
    switch (status) {
      case "REQUEST":
        return "예약 대기";
      case "CANCEL":
        return "예약 취소";
      case "RESERVATION":
        return "예약 확정";
      case "COMPLETION":
        return "설치 완료";
      case "FALLSE":
        return "신청 취소";
      default:
        return status;
    }
  }
  
  export function getUserGradeText(grade: string): string {
    return grade === "NOUSER" ? "비회원" : "회원";
  }
  