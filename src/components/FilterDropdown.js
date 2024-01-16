import React from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

const FilterDropdown = ({ selectedOptions,category, options, onSelect }) => {
  // const [selectedOptions, setSelectedOptions] = useState({ [category]: [] });

  const handleOptionChange = (event) => {
    const { value } = event.target;
    // setSelectedOptions({
    //   [category]: value,
    // });
    onSelect({
      [category]: value,
    });
    // console.log('data',selectedOptions)
  };

  return (
    <div className="filter-dropdown">
      {options ? (
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel htmlFor={`${category}-select`}>{category}</InputLabel>
          <Select
            labelId={`${category}-label`}
            id={`${category}-select`}
            multiple
            value={selectedOptions[category]|| []}
            onChange={handleOptionChange}
            renderValue={(selected) => selected.join(", ")}
            input={<OutlinedInput label={`${category}-label`} />}
            sx={{
              "& fieldset": {
                border: "none",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={!!selectedOptions[category]?.includes(option)} />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <p>No options available for {category}</p>
      )}
    </div>
  );
};

export default FilterDropdown;
