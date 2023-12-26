import React, { useState } from "react";
import styles from "./styles.module.css";
import { useCarrito } from "../../Context/CartContext"; // Asegúrate de importar el contexto o componente padre que maneja el carrito

const Checkout = ({ onClose }) => {
  const { vaciarCarrito } = useCarrito();
  console.log("Valor de onClose:", onClose); // Usa el contexto o componente padre que maneja el carrito

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [inputErrors, setInputErrors] = useState({
    name: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [purchaseMessage, setPurchaseMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    const currentYear = getCurrentYear();

    switch (name) {
      case "name":
        if (value.trim() === "") {
          error = "Este campo es obligatorio";
        } else if (value.length > 50) {
          error = "El nombre no puede tener más de 50 caracteres";
        }
        break;

      case "cardNumber":
        const cardNumberRegex = /^\d{16}$/;
        if (!cardNumberRegex.test(value.trim())) {
          error = "El número de tarjeta debe tener 16 dígitos numéricos";
        }
        break;

      case "expirationDate":
        const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expirationDateRegex.test(value.trim())) {
          error = "La fecha de expiración debe tener el formato MM/AA";
        } else {
          const [month, year] = value.split("/");
          const inputDate = new Date(`20${year}`, month - 1);
          const currentDate = new Date();

          if (inputDate <= currentDate) {
            error = "Tarjeta vencida";
          }
        }
        break;

      case "cvv":
        const cvvRegex = /^\d{3}$/;
        if (!cvvRegex.test(value.trim())) {
          error = "El CVV debe tener 3 dígitos numéricos";
        }
        break;

      default:
        break;
    }

    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleBuyClick = () => {
    // Validación de datos
    if (validateForm()) {
      setPurchaseMessage("Compra realizada con éxito. ¡Gracias!");
      // Vaciar el formulario y cerrar después de un tiempo (por ejemplo, 3 segundos)
      setTimeout(() => {
        setFormData({
          name: "",
          cardNumber: "",
          expirationDate: "",
          cvv: "",
        });
        setPurchaseMessage("");
        onClose(); // Cierra el formulario utilizando la función onClose
      }, 3000);
    } else {
      setPurchaseMessage(
        "Por favor, completa la información de pago correctamente."
      );
    }
  };

  const handleCancelClick = () => {
    // Limpiar el formulario, mensajes de compra y vaciar el carrito
    setFormData({
      name: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    });
    setPurchaseMessage("");
    vaciarCarrito();
  
    // Verifica si onClose es una función antes de llamarla
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const validateForm = () => {
    // Validación final
    return (
      formData.name.trim() !== "" &&
      formData.cardNumber.trim() !== "" &&
      formData.expirationDate.trim() !== "" &&
      formData.cvv.trim() !== "" &&
      Object.values(inputErrors).every((error) => error === "")
    );
  };

  const getCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    return currentYear.toString().slice(2);
  };

  return (
    <div className={styles.checkoutContainer}>
      <div
        className={styles.closeButton}
        onClick={() => {
          onClose();
          console.log("Cerrando modal");
        }}
      >
        X
      </div>
      <h2>Información de Pago</h2>
      <form>
        <label>
          Nombre en la Tarjeta:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nombre Apellido"
            className={inputErrors.name ? styles.errorInput : ""}
          />
          {inputErrors.name && (
            <p className={`${styles.errorText} ${styles.redText}`}>
              {inputErrors.name}
            </p>
          )}
        </label>
        <label>
          Número de Tarjeta:
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="XXXX XXXX XXXX XXXX"
            className={inputErrors.cardNumber ? styles.errorInput : ""}
          />
          {inputErrors.cardNumber && (
            <p className={`${styles.errorText} ${styles.redText}`}>
              {inputErrors.cardNumber}
            </p>
          )}
        </label>
        <label>
          Fecha de Expiración:
          <input
            type="text"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleInputChange}
            placeholder="MM/AA"
            className={inputErrors.expirationDate ? styles.errorInput : ""}
          />
          {inputErrors.expirationDate && (
            <p className={`${styles.errorText} ${styles.redText}`}>
              {inputErrors.expirationDate}
            </p>
          )}
        </label>
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            placeholder="XXX"
            className={inputErrors.cvv ? styles.errorInput : ""}
          />
          {inputErrors.cvv && (
            <p className={`${styles.errorText} ${styles.redText}`}>
              {inputErrors.cvv}
            </p>
          )}
        </label>
        <button type="button" onClick={handleBuyClick}>
          Comprar
        </button>
        {purchaseMessage && (
          <>
             <p className={styles.purchaseMessage}>{purchaseMessage}</p>
          <button type="button" onClick={handleCancelClick}>
            Cancelar Compra
          </button>
        </>
      )}
    </form>
  </div>
);
};

export default Checkout;
