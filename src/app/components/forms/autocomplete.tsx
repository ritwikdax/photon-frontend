import { Autocomplete, TextField, Box } from "@mui/material";

export default function AutoCompleteDropdown() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
      }}>
      <Autocomplete
        defaultValue={"fesfwes"}
        size="small"
        sx={{
          width: 500,
          color: "white",
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
        options={["sdfsdf", "sdfsdfs"]}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              label: { color: "white" },
            }}
          />
        )}
      />
    </Box>
  );
}
