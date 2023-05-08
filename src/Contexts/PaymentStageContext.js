import { createContext, useState, useContext } from "react";

const OrderStageContext = createContext();

export const useOrderStage = () => useContext(OrderStageContext);

export const PaymentStageProvider = ({ children }) => {
  const [isPayment, setIsPayment] = useState(false);

  return (
    <OrderStageContext.Provider value={{ isPayment, setIsPayment }}>
      {children}
    </OrderStageContext.Provider>
  );
};