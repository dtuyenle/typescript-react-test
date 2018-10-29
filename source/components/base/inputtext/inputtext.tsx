import * as React from 'react';

interface InputText {
  placeholder: string,
  onChange?: (value: any) => void
}

const debounce = (func: (value: any) => void, wait: number) => {
  let timeout = 0;
  return function(...args: any[]) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};


const InputText: React.SFC<InputText> = (props) => {
  const handleChangeDebounce = props.onChange ? debounce(props.onChange.bind(this), 500) : () => {};

  return (<div className="inputtext-container">
    <input
      type="text"
      placeholder={props.placeholder}
      onChange={(event) => {
        handleChangeDebounce(event.target.value);
      }}
    />
  </div>);
};



InputText.defaultProps = {
  placeholder: ''
};

export default InputText;