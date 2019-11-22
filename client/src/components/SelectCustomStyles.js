const customStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: "transparent",
    border: "none"
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? "pink"
        : isFocused
        ? "rgba(0,0,0,0.14)"
        : null,
      color: isDisabled ? "#ccc" : isSelected ? "salmon" : "rgba(0, 0, 0, 0.6)",
      //     ? "white"
      //     : "black"
      //   : data.color,
      // cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? "white" : "salmon")
      }
    };
  }
};

export default customStyles;
