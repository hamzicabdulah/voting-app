// Styles that were simpler to do with regular CSS are located in lib/public/main.css
const formTableFont = {
    fontFamily: "'Open Sans', sans-serif",
    "textTransform": "uppercase"
};
const anchorNoDecor = {
    "color": "white",
    "textDecoration": "none"
};
const pollDiv = {
  border: "gray 1px solid",
  boxShadow: "0 3px 3px 0 rgba(0, 0, 0, 0.3), 0 4px 7px 0 rgba(0, 0, 0, 0.19)",
  textAlign: "center",
  "fontFamily": "'Rokkitt', serif"
};
const questionDiv = {
  fontWeight: 700,
  fontSize: "1.3em",
  display: "block",
  marginTop: ".5em",
  overflow: "hidden",
  textOverflow: "clip",
  wordWrap: "break-word"
};
const notification = {
  NotificationItem: { 
    DefaultStyle: {
      fontFamily: "'Open Sans', sans-serif"
    }
  }
};
const pollPageBtn = {
  ...formTableFont,
  borderRadius: 0,
  "background": "#193366"
};

const homeStyle = {
  header: {
    fontFamily: "'Ultra', serif",
    textTransform: "uppercase",
    marginTop: "1.5em",
    color: "white"
  },
  paragraph: {
    fontFamily: "'Open Sans', sans-serif",
    margin: "0 auto 1em"
  },
  btn: {
    ...formTableFont,
    borderRadius: 0,
    margin: "0 .3em"
  }
};

const pollListStyle = {
  table: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "2% 5%"
  },
  poll: {
    ...pollDiv,
    width: "25em",
    margin: ".3em",
    position: "relative"
  },
  question: questionDiv,
  footer: {
    fontFamily: "'Open Sans', sans-serif",
    position: "absolute",
    bottom: "0",
    width: "100%",
    left: 0,
    right: 0,
    margin: "auto"
  },
  voteBtn: {
    marginBottom: ".25em",
    textTransform: "uppercase",
    borderRadius: 0,
    outline: "none",
    fontWeight: "bold"
  },
  footerChild: {
    margin: 0,
    padding: ".5em",
    borderTop: "solid 1px gray"
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
  header: {
    fontFamily: "'Ultra', sans-serif",
    fontSize: "2.3em",
    marginBottom: ".3em",
    color: "#193366"
  },
  label: {
    ...formTableFont,
    "display": "block"
  },
  input: {
    "margin": "0 0 .5em",
    "fontSize": "1.3em",
    "padding": ".5em",
    "border": "solid 1px",
    "background": "transparent",
    "fontFamily": "'Rokkitt', serif"
  },
  option: {
    display: "inline-block",
    background: "#ffff1a",
    border: "solid 1px gray",
    margin: "0 .35em .75em 0",
    padding: ".25em .25em .25em .5em",
    borderRadius: "7%"
  },
  removeIcon: {
    marginLeft: ".5em",
    cursor: "pointer"
  },
  submit: {
      ...formTableFont,
      display: "inline-block",
      "background": "#193366",
      color: "white",
      "borderRadius": 0,
      "fontSize": "1.1em",
      "padding": ".5em 1em",
      "cursor": "pointer",
      margin: "0 .5em 0 0"
  },
  notification: notification
};

const iconBtn = {
  fontSize: "1.5em",
  border: ".5px solid",
  background: "#d6d6c2"
};

const pollStyle = {
  pageContainer: {
    fontFamily: "'Courgette', cursive",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    textTransform: "none",
    margin: "0 auto",
    padding: "3.6% 5%"
  },
  poll: {
    ...pollDiv,
    marginBottom: ".5em"
  },
  question: questionDiv,
  options: {
    marginTop: "1em"
  },
  voteBtn: {
    width: "100%",
    borderRadius: 0,
    outline: "none"
  },
  button: {
    ...pollPageBtn,
    width: "50%"
  },
  inputContainer: {
    width: "100%",
    marginTop: ".5em"
  },
  input: {
    fontSize: "1.4em",
    "fontFamily": "'Rokkitt', serif",
    padding: ".25em",
    marginBottom: ".25em"
  },
  submit: {
    ...pollPageBtn
  },
  addedBy: {
    "fontFamily": "'Rokkitt', serif",
    marginTop: ".3em",
    textAlign: "center"
  },  
  notification: notification
};

export { homeStyle, pollListStyle, formStyle, pollStyle };