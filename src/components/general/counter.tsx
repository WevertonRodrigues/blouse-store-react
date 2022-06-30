import { Add, Remove } from "@mui/icons-material";
import { Button, Stack, TextField, TextFieldProps } from "@mui/material";
import { ReactNode, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

interface CounterProps {
  label?: string;
  counter?: string | number;
  defaultValue?: string | number;
  preventNegative?: boolean;
  onSetCounter: (counter: number) => any;
  onPlusClick?: () => any;
  onMinusClick?: () => any;
  TextFieldProps?: TextFieldProps;
}

function CounterBtn({
  icon,
  onClick,
}: {
  icon: ReactNode;
  onClick: () => any;
}) {
  return (
    <Button
      size="small"
      variant="outlined"
      sx={{ minWidth: "auto" }}
      onClick={() => onClick()}
    >
      {icon}
    </Button>
  );
}

export default function Counter({
  label,
  counter = 0,
  preventNegative,
  defaultValue,
  onSetCounter,
  onMinusClick,
  onPlusClick,
  TextFieldProps,
}: CounterProps) {
  if (!counter) {
    counter = Number(defaultValue ?? 0);
  }

  const [lazyCounter, setLazyCounter] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    setLazyCounter(Number(counter || 0));
  }, [counter]);

  onMinusClick ??= () =>
    onSetCounter(
      preventNegative && counter === 0 ? 0 : Number(counter ?? 0) - 1
    );

  onPlusClick ??= () => onSetCounter(Number(counter ?? 0) + 1);

  const setLazyCounterFromValue = (value: string | number) => {
    const n = Number(value);

    if (Number.isNaN(n)) {
      return;
    }

    setLazyCounter(Number(value));
  };

  return (
    <Stack direction="row" alignItems="center">
      {<CounterBtn icon={<Remove />} onClick={onMinusClick} />}
      <TextField
        value={lazyCounter}
        type="tel"
        sx={{ mx: 1 }}
        label={label}
        defaultValue={defaultValue}
        InputLabelProps={{ shrink: true }}
        {...TextFieldProps}
        inputProps={{
          ref: inputRef,
          className: "counter-input",
        }}
        onChange={(value) => setLazyCounterFromValue(value.currentTarget.value)}
        onKeyDown={(value) => {
          if (value.key === "Enter") {
            setLazyCounterFromValue((value.target as any).value);
            (inputRef?.current as unknown as HTMLInputElement)?.blur();
          }
        }}
        onBlur={(value) => onSetCounter(Number(value.target.value))}
      ></TextField>
      {<CounterBtn icon={<Add />} onClick={onPlusClick} />}
    </Stack>
  );
}
