import { ProductEntity } from "@/utils/types";
import styles from "./QuicklyOrder.module.scss";
import { observer } from "mobx-react-lite";
import {  useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Text from "@components/Text";
import Button from "@components/Button";
import Input from "@components/Input";
import ContactForm from "@components/ContactForm";
import RandomDiscount from "@components/RandomDiscount";
import CustomStepIcon from "./CustomStepIcon";
import rootStore from "@/stores/RootStore";
import RatingChoice from "@components/RatingChoice";

type ActionsButtonProps = {
  handleNext: () => void;
  handleBack: () => void;
  steps: string[];
  activeStep: number;
  disabled: boolean;
  loading?: boolean;
};

const ActionsButton = ({
  handleNext,
  handleBack,
  steps,
  activeStep,
  disabled,
  loading,
}: ActionsButtonProps) => {
  return (
    <div className={styles.quicklyOrder__actions}>
      <Button color="inherit" disabled={disabled} onClick={handleBack}>
        Назад
      </Button>

      <Button loading={loading} onClick={handleNext}>
        {activeStep === steps.length - 1 ? "Отправить заказ" : "Далее"}
      </Button>
    </div>
  );
};

type QuicklyOrderProps = {
  product: ProductEntity;
};

const QuicklyOrder = ({ product }: QuicklyOrderProps) => {
  const steps = ["Укажите количество", "Заполните данные", "Получите скидку"];
  const [activeStep, setActiveStep] = useState(0);
  const [count, setCount] = useState(1);
  const [discount, setDiscount] = useState(0);
  const productId = product.id;
  const cartStore = rootStore.cart;
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await   cartStore.submitQuickOrder(productId, count, 0);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={styles.quicklyOrder}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        orientation="horizontal"
      >
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {cartStore.loading && null}
      {activeStep === 0 && (
        <>
          <div className={styles.quicklyOrder__content}>
            <div className={styles.quicklyOrder__count}>
              <Text view="p-20">{product.title}</Text>
              <Input
                className={styles.quicklyOrder__input}
                type="number"
                value={count}
                onChange={(value) => setCount(Number(value))}
                afterSlot={
                  <Text view="p-14" color="secondary">
                    шт.
                  </Text>
                }
              />
            </div>
            <Text view="p-16" color="secondary">
              Всего на сумму: ${product.price * count}
            </Text>
          </div>
          <ActionsButton
            handleNext={handleNext}
            handleBack={handleBack}
            steps={steps}
            activeStep={activeStep}
            disabled={activeStep === 0}
          />
        </>
      )}

      {activeStep === 1 && (
        <>
          <div className={styles.quicklyOrder__content}>
            <ContactForm />
          </div>
          <ActionsButton
            handleNext={handleNext}
            handleBack={handleBack}
            steps={steps}
            activeStep={activeStep}
            disabled={activeStep !== 1}
          />
        </>
      )}
      {activeStep === 2 && (
        <>
          <div className={styles.quicklyOrder__content}>
            <RandomDiscount product={product} count={count} discount={discount} setDiscount={setDiscount} />
          </div>
          <ActionsButton
            handleNext={handleNext}
            handleBack={handleBack}
            steps={steps}
            activeStep={activeStep}
            disabled={activeStep !== 2}
            loading={cartStore.loading}
          />
        </>
      )}

      {activeStep === steps.length && (
        <div className={styles.quicklyOrder__content}>
          <RatingChoice />
        </div>
      )}
    </div>
  );
};

export default observer(QuicklyOrder);
