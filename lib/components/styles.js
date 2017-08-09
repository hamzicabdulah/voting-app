const formTableFont = {
    "fontFamily": "'Acme', sans-serif",
    "textTransform": "uppercase"
};
const anchorNoDecor = {
    "color": "white",
    "textDecoration": "none"
};
const wideBtnStyle = {
  ...formTableFont,
  display: "block",
  marginBottom: ".5em",
  border: "none",
  borderRadius: "5em",
  background: "#80aaff",
  padding: ".35em"
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
    ...formTableFont,
    ...anchorNoDecor,
    "marginLeft": "2em",
    "cursor": "pointer",
  }
};

const pollListStyle = {
  table: {
    ...formTableFont,
    margin: "0 auto",
    fontSize: "1.3em"
  },
  poll: {
    ...wideBtnStyle,
    textTransform: "none",
    position: "relative",
    width: "60%",
    margin: "0 auto .5em"
  },
  question: {
    display: "inline-block",
    textDecoration: "none",
    color: "black",
    marginLeft: ".25em"
  },
  totalVotes: {
    position: "absolute",
    right: ".5em"
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
    ...formTableFont,
    "display": "block"
  },
  input: {
    "marginTop": ".25em",
    "marginBottom": ".5em",
    "fontSize": "1.2em",
    "padding": ".5em",
    "border": "solid 1px",
    "background": "transparent",
    "fontFamily": "'Rokkitt', serif"
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
      ...formTableFont,
      display: "inline-block",
      fontWeight: "normal",
      "background": "black",
      "color": "white",
      "border": "none",
      "fontSize": "1em",
      "padding": ".5em 1em",
      "cursor": "pointer",
      margin: "0 .5em 0 0"
  }
};

const iconBtn = {
  fontSize: "1.5em",
  border: ".5px solid",
  background: "#d6d6c2"
};

const pollStyle = {
  pollDiv: {
    fontFamily: "'Courgette', cursive",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    textTransform: "none",
    margin: "0 auto"
  },
  voteDiv: {
    width: "43%"
  },
  voteBtn: {
    ...wideBtnStyle,
    width: "60%"
  },
  trash: {
    ...iconBtn,
    color: "#b30000",
    marginRight: ".2em"
  },
  add: {
    ...iconBtn,
    color: "#002266"
  },
  results: {
    width: "43%"
  }
};

export { navbarStyle, pollListStyle, formStyle, pollStyle };