import react from 'react'
import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';

function NumberFormatField({ textFieldProps, allowNegative, decimalScale, fixedDecimalScale, min, max, ...rest }){

    return (
        <NumericFormat
          customInput={TextField}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={allowNegative}
          inputProps={textFieldProps}
          {...rest}
          isAllowed={(values) => {
            if(min && max){
              const { floatValue } = values;
              return floatValue >= min && floatValue <= max;
            }
            return true;
          }}
        />
      );
}

export default NumberFormatField;
