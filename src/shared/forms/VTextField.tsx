import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";



type TVTextFieldProps = TextFieldProps &{
    name: string;
}


export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) =>{
    const {fieldName, defaultValue, error, registerField, clearError} = useField(name);

    const [value, setValue] = useState(defaultValue || "");




    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (e, newValue) => setValue(newValue),
        });
    }, [registerField, fieldName, value]);


    return(
        <TextField
        {...rest}

        error={!!error} //transforma de undefined para boolean e nego esse boleano
        helperText={error} //joga um texto embaixo da input
        defaultValue={defaultValue}

        onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e)}} //

        value={value}
        onChange={e => {setValue(e.target.value); rest.onChange?.(e)}}        
        />
    );
};