import { forwardRef } from "react";

const FormInput = forwardRef(({ classNames, label, ...rest }, ref) => (
  <>
    <label>{label}</label>
    <input className={classNames} ref={ref} {...rest} />
  </>
));

export default FormInput;
