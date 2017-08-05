const robotoFont = {
    "fontFamily": "'Roboto', sans-serif",
    "textTransform": "uppercase"
};
const anchorNoDecor = {
    "color": "white",
    "textDecoration": "none"
};
const inputStyle = {
    "marginTop": ".25em",
    "marginBottom": ".5em",
    "fontSize": "1.1em",
    "padding": ".5em",
    "border": "solid 1px",
    "background": "transparent",
    "fontFamily": "cursive"
};

const navbarStyle = {
  navbar: {
    "background": "black",
    "color": "white",
    "display": "flex",
    "justifyContent": "space-between",
    "fontWeight": "bold"
  },
  heading: {
    "margin": ".25em",
    "marginLeft": ".5em",
    "fontFamily": "'Frijole', cursive"
  },
  headingAnchor: anchorNoDecor,
  linksContainer: {
    "margin": "1.25em"
  },
  link: {
    ...robotoFont,
    ...anchorNoDecor,
    "marginLeft": "2em",
    "cursor": "pointer",
  }
};

const formStyle = {
  formsContainer: {
    "display": "flex",
    "flexWrap": "wrap",
    "justifyContent": "center",
    "marginTop": "7%"
  },
  form: {
    ...robotoFont,
    "fontWeight": "bold"
  },
  label: {
    "display": "block"
  },
  input: inputStyle,
  options: {
    "display": "grid",
    "gridTemplateColumns": "90% 10%"
  },
  optionsInput: {
    ...inputStyle,
    "width": "auto"
  },
  optionsBtn: {
    ...inputStyle,
    ...robotoFont
  },
  submit: {
      ...robotoFont,
      "background": "black",
      "color": "white",
      "border": "none",
      "fontSize": "1em",
      "padding": ".5em 1em",
      "cursor": "pointer"
  }
};

export { navbarStyle, formStyle };