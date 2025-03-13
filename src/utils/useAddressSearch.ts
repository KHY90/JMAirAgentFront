import { useState } from "react";

export function useAddressSearch() {
  const [address, setAddress] = useState("");

  const searchAddress = () => {
    if (typeof window !== "undefined" && (window as any).daum?.Postcode) {
      new (window as any).daum.Postcode({
        oncomplete: (data: any) => {
          setAddress(data.address);
        },
      }).open();
    } else {
      alert("주소 검색 기능을 사용할 수 없습니다.");
    }
  };

  return { address, searchAddress, setAddress };
}
