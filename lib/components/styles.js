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
    "fontSize": "1.2em",
    "padding": ".5em",
    "border": "solid 1px",
    "background": "transparent",
    "fontFamily": "'Rokkitt', serif"
};

const navbarStyle = {
  navbar: {
    "background": "black",
    "color": "white",
    "display": "flex",
    "justifyContent": "space-between",
    "fontWeight": "bold",
    marginBottom: "5%"
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

const tdStyle = {
  padding: ".5em .25em",
  verticalAlign: "middle",
  textDecoration: "none"
};

const homeStyle = {
  table: {
    ...robotoFont,
    margin: "0 auto",
    textAlign: "left",
    fontSize: "1.3em",
    border: "1px solid black",
    borderCollapse: "collapse"
  },
  row: {
    border: "1px solid black"
  },
  questionTh: tdStyle,
  question: {
    ...tdStyle,
    textTransform: "none",
    marginRight: "2em"
  },
  totalVotes: {
    ...tdStyle,
    textAlign: "center",
    borderLeft: "1px solid black"
  }
};

const formStyle = {
  formsContainer: {
    "display": "flex",
    "flexWrap": "wrap",
    "justifyContent": "center"
  },
  form: {
    "fontWeight": "bold"
  },
  label: {
    ...robotoFont,
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
  option: {
    display: "inline-block",
    background: "#003399",
    color: "white",
    margin: "0 .35em .75em 0",
    padding: ".25em .5em",
    borderRadius: "5%"
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

const pollStyle = {
  pollDiv: {
    ...robotoFont,
    display: "flex",
    justifyContent: "space-around",
    textTransform: "none",
    margin: "0 auto"
  },
  voteDiv: {
    width: "43%"
  },
  results: {
    width: "43%"
  }
};

export { navbarStyle, homeStyle, formStyle, pollStyle };